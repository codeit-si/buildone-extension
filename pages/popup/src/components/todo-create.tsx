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
    <div className="w-full h-full py-24 text-sm">
      <header className="text-gray-900 px-16">
        <button onClick={goBuilDoneSite}>
          <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        </button>
      </header>
      <main className="mt-16">
        <form className="flex flex-col gap-16 px-16">
          <Input id="link" type="text" value={link} readOnly />
          <Input id="title" type="text" placeholder="할 일의 제목을 적어주세요." {...register('title')} />
          <GoalDropdown />
        </form>
        <div className="px-16 w-full border-t border-slate-200 mt-24 pt-24">
          <Button className="w-150 font-semibold" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
            생성하기
          </Button>
        </div>
      </main>
    </div>
  );
}
