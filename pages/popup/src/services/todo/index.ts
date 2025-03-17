import api from '@src/lib/axios';
import type { TodoResponse } from '@src/types/todo';
import { ENDPOINT } from '../endpoint';

export interface TodoParams {
  goalId?: number;
  title: TodoResponse['title'];
  fileUrl?: TodoResponse['fileUrl'];
  linkUrl?: TodoResponse['linkUrl'];
}

export const createTodo = async (newTodo: TodoParams) => {
  const { data } = await api.post<TodoResponse>(ENDPOINT.TODO.CREATE, newTodo);
  return data;
};
