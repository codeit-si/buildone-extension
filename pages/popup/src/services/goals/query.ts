import { infiniteQueryOptions } from '@tanstack/react-query';
import { getInfiniteGoals } from '.';
import type { GoalListParams } from '@src/types/goal';
import { goalKeys } from '../query-key';

export const getInfiniteGoalsOptions = ({ size = 3, sortOrder = 'newest' }: GoalListParams) => {
  return infiniteQueryOptions({
    queryKey: goalKeys.list(size),
    queryFn: ({ pageParam }) => getInfiniteGoals({ size, sortOrder, cursor: pageParam }),
    getNextPageParam: lastPage =>
      lastPage.paginationInformation.hasNext ? lastPage.paginationInformation.nextCursor : null,
    initialPageParam: 0,
    select: data => ({
      pages: data.pages.flatMap(page => page.goals),
      pageParams: data.pageParams,
    }),
  });
};
