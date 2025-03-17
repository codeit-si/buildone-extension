import { withErrorBoundary, withSuspense } from '@extension/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TodoCreate from './components/todo-create';

export const todoFormSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(30, '30자 이내로 입력해주세요'),
  link: z.union([z.literal(''), z.string().trim().url('올바른 URL을 입력해주세요')]),
});

export type TodoFormSchema = z.infer<typeof todoFormSchema>;

interface TodoModalFormContextProps {
  register: UseFormRegister<TodoFormSchema>;
  watch: UseFormWatch<TodoFormSchema>;
  formState: {
    errors: FieldErrors<TodoFormSchema>;
    isValid: boolean;
  };
  trigger: UseFormTrigger<TodoFormSchema>;
  handleSubmit: UseFormHandleSubmit<TodoFormSchema>;
  setValue: UseFormSetValue<TodoFormSchema>;
  selectedGoalId?: number;
  setSelectedGoalId: Dispatch<SetStateAction<number | undefined>>;
}

const TodoFormContext = createContext<TodoModalFormContextProps | null>(null);

export const useTodoFormContext = () => {
  const context = useContext(TodoFormContext);
  if (!context) {
    throw new Error('할일 모달 폼 내부에서 context를 사용해주세요요');
  }
  return context;
};

function Popup() {
  const { register, handleSubmit, watch, setValue, formState, trigger } = useForm<TodoFormSchema>({
    resolver: zodResolver(todoFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      link: '',
    },
  });
  const [selectedGoalId, setSelectedGoalId] = useState<number | undefined>();

  const formContextValue = useMemo(
    () => ({
      handleSubmit,
      setValue,
      register,
      watch,
      formState,
      trigger,
      selectedGoalId,
      setSelectedGoalId,
    }),
    [register, watch, formState, trigger, handleSubmit, setValue, selectedGoalId],
  );

  return (
    <TodoFormContext.Provider value={formContextValue}>
      <TodoCreate />
    </TodoFormContext.Provider>
  );
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
