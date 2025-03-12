import Input from '@src/components/Input';
import { useCreateTodo } from '@src/hooks/query/use-create-todo';
import { useEffect } from 'react';
import GoalDropdown from './goal-dropdown';
import Button from './button';
import type { TodoFormSchema } from '@src/Popup';
import { useTodoFormContext } from '@src/Popup';

export default function TodoCreate() {
  const { mutate } = useCreateTodo();
  const {
    formState: { isValid },
    handleSubmit,
    selectedGoalId,
    watch,
    setValue,
    register,
  } = useTodoFormContext();
  const link = watch('link');

  const logo = 'popup/logo.svg';
  const goBuilDoneSite = () => chrome.tabs.create({ url: 'https://buildone.me' });

  const onSubmit = (data: TodoFormSchema) => {
    const { title, link } = data;
    mutate({ title, linkUrl: link, goalId: selectedGoalId });
  };

  useEffect(() => {
    const getPageUrl = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const { url } = tabs[0];
        setValue('link', url!);
      });
    };
    getPageUrl();
  }, [setValue]);

  return (
    <div className="w-full h-full px-16 py-24">
      <header className="text-gray-900">
        <button onClick={goBuilDoneSite}>
          <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        </button>
      </header>
      <main className="mt-16">
        <form className="flex flex-col gap-16">
          <Input id="link" type="text" value={link} readOnly />
          <Input id="title" type="text" placeholder="할 일의 제목을 적어주세요." {...register('title')} />
          <GoalDropdown />
          <Button className="w-full" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
            확인
          </Button>
        </form>
      </main>
    </div>
  );
}
