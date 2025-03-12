import type { GoalSimpleResponse } from './goal';

export interface TodosByGoalParams {
  goalId?: number;
  cursor?: number;
  size?: number;
  done?: boolean;
}

export interface TodoResponse {
  id: number;
  noteId: number | null;
  title: string;
  goalInformation: GoalSimpleResponse | null;
  linkUrl: string | null;
  fileUrl: string | null;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoListResponse {
  paginationInformation: {
    nextCursor: number | null;
    totalCount: number;
    hasNext: boolean;
  };
  todos: TodoResponse[];
}
