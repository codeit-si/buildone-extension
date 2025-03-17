import { invalidateTodoRelatedQueries } from '@src/services/invalidate';
import type { TodoParams } from '@src/services/todo';
import { createTodo } from '@src/services/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTodo: TodoParams) => createTodo(newTodo),
    onSuccess: data => {
      invalidateTodoRelatedQueries(queryClient, data.goalInformation?.id);
    },
  });
};
