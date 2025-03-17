import type { TodosByGoalParams } from '@src/types/todo';

export const goalKeys = {
  all: ['goals'] as const,
  list: (size: number) => [...goalKeys.all, 'list', { size }] as const,
  detail: (id: number) => [...goalKeys.all, 'detail', { goalId: id }] as const,
  progress: (id: number) => [...goalKeys.all, 'progress', { goalId: id }] as const,
};

export const todoKeys = {
  all: ['todos'] as const,
  list: ({ size, goalId, done }: TodosByGoalParams) => [...todoKeys.all, 'list', { size, goalId, done }] as const,
  detail: (id: number) => [...todoKeys.all, 'detail', { todoId: id }] as const,
};

export const dashboardKeys = {
  all: ['dashboard'] as const,
  recent: () => [...dashboardKeys.all, 'todos', 'recent'] as const,
  progress: () => [...dashboardKeys.all, 'progress'] as const,
};

export const noteKeys = {
  all: ['notes'] as const,
  detail: (id: number) => [...noteKeys.all, 'detail', { noteId: id }] as const,
};
