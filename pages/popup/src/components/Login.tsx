import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@src/components/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from './button';
import { useEffect } from 'react';
import { useDebounce } from '@src/hooks/use-debounce';
import { login } from '@src/services/auth';
import { ApiError } from '@src/lib/error';
import { useNavigate } from 'react-router';
import { LOGIN_ERROR_CODE } from '@src/constants/error';

const loginSchema = z.object({
  email: z.string().nonempty('이메일을 입력해주세요.').email('이메일 형식을 입력해주세요.'),
  password: z.string().nonempty('비밀번호를 입력해주세요.'),
});

type LoginSchema = z.infer<typeof loginSchema>;
type LoginSchemaKey = keyof LoginSchema;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setError,
    trigger,
    watch,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();

  const email = watch('email');
  const debouncedEmail = useDebounce(email, 1000);

  useEffect(() => {
    if (debouncedEmail) {
      trigger('email');
    }
  }, [debouncedEmail, trigger]);

  const logo = 'popup/logo.svg';
  const goGithubSite = () => chrome.tabs.create({ url: 'https://buildone.me' });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data.email, data.password);

      navigate('/dashboard');
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        if (
          error.code === LOGIN_ERROR_CODE.INVALID_EMAIL_FORMAT ||
          error.code === LOGIN_ERROR_CODE.NOT_FOUND_MEMBER_WITH_EMAIL
        ) {
          setError('email', { type: 'valid', message: error.message });
        }

        if (error.code === LOGIN_ERROR_CODE.INVALID_PASSWORD_FORMAT) {
          setError('password', { type: 'valid', message: error.message });
        }
      }
    }
  };

  return (
    <div className="w-full h-full px-16 py-24">
      <header className="text-gray-900">
        <button onClick={goGithubSite}>
          <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        </button>
      </header>
      <main className="mt-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          {[
            {
              key: 'email',
              label: '아이디',
              placeholder: '이메일을 입력해주세요.',
            },
            {
              key: 'password',
              label: '비밀번호',
              placeholder: '비밀번호를 입력해주세요.',
            },
          ].map(({ key, label, placeholder }, index) => (
            <div className={index > 0 ? 'mt-24' : ''} key={key}>
              <Input
                id={key}
                label={label}
                type={key.includes('password') ? 'password' : 'text'}
                placeholder={placeholder}
                {...register(key as LoginSchemaKey)}
                className={
                  errors[key as LoginSchemaKey] && 'border-red-500 focus-within:border-red-500 hover:border-red-500'
                }
              />
              {errors[key as LoginSchemaKey] && (
                <p className="mt-8 inline-block text-sm font-normal text-red-500">
                  {errors[key as LoginSchemaKey]?.message}
                </p>
              )}
            </div>
          ))}
          <Button type="submit" className="mt-48 w-full" disabled={!isDirty || !isValid}>
            로그인하기
          </Button>
        </form>
      </main>
    </div>
  );
}
