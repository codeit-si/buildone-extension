import type { GoalListParams, GoalListResponse } from '@src/types/goal';
import { ENDPOINT } from '../endpoint';
import api from '@src/lib/axios';

export const getInfiniteGoals = async ({ size, sortOrder, cursor }: GoalListParams) => {
  const { data } = await api.get<GoalListResponse>(ENDPOINT.GOAL.GET_ALL, {
    params: {
      cursor,
      size,
      sortOrder,
    },
  });
  return data;
};
