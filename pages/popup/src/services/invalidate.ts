import type { QueryClient } from '@tanstack/react-query';
import { dashboardKeys, goalKeys, todoKeys } from './query-key';

export const invalidateTodoRelatedQueries = (queryClient: QueryClient, goalId?: number) => {
  queryClient.invalidateQueries({ queryKey: todoKeys.all });
  queryClient.invalidateQueries({ queryKey: dashboardKeys.recent() });

  if (goalId) {
    queryClient.invalidateQueries({ queryKey: goalKeys.progress(goalId) });
  }
};
