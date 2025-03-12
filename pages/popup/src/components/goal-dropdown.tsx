import { useInfiniteQuery } from '@tanstack/react-query';

import Label from './Label';
import { cn } from '@extension/ui';
import type { MouseEvent } from 'react';
import { useEffect } from 'react';
import { getInfiniteGoalsOptions } from '@src/services/goals/query';
import useSelector from '@src/hooks/use-selector';
import { useInfiniteScroll } from '@src/hooks/use-infinite-scroll';
import { useTodoFormContext } from '@src/Popup';

const BASE_CLASS =
  'flex items-center justify-center space-x-8 rounded-xl border border-slate-50 bg-slate-50 px-24 py-12 font-normal focus-within:border-dark-blue-500 hover:border-dark-blue-300';

export default function GoalDropdown() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(getInfiniteGoalsOptions({ size: 20 }));
  const { ref: scrollRef, refTrigger } = useInfiniteScroll({
    hasNextPage,
    fetchNextPage,
  });

  const arrowIcon = 'popup/arrow_dropdown.svg';
  const arrowReverseIcon = 'popup/arrow_dropdown_reverse.svg';

  const { isOpen, ref, toggleHandler } = useSelector();
  const { selectedGoalId, setSelectedGoalId } = useTodoFormContext();

  const goalTitle = data?.pages.find(page => page.id === selectedGoalId)?.title;

  const handleSelectGoal = (e: MouseEvent<HTMLButtonElement>) => {
    const dataset = e.currentTarget.dataset as { goal: string };
    const goalIdData = dataset.goal;
    setSelectedGoalId(Number(goalIdData));
    toggleHandler();
  };

  useEffect(() => {
    refTrigger();
  }, [isOpen, refTrigger]);

  return (
    <div
      className="relative"
      role="presentation"
      ref={ref}
      onClick={toggleHandler}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          toggleHandler();
        }
      }}>
      <Label label="Add to" className="font-medium text-slate-400" />
      <span className={cn(BASE_CLASS, 'cursor-pointer justify-between text-slate-400', goalTitle && 'text-slate-800')}>
        {goalTitle ?? '목표를 선택해주세요.'}{' '}
        {isOpen ? (
          <img src={chrome.runtime.getURL(arrowReverseIcon)} alt="dropdown" />
        ) : (
          <img src={chrome.runtime.getURL(arrowIcon)} alt="dropdown" />
        )}
      </span>
      {isOpen && (
        <ul
          className={cn(
            'scrollbar absolute bottom-52 max-h-200 w-full overflow-auto rounded-xl border border-dark-blue-300 bg-slate-100',
          )}>
          {data?.pages.map(page => (
            <li
              key={`create-todo-modal-${page.id}`}
              className="flex w-full items-center justify-between space-x-8 border border-slate-50 bg-slate-50 font-normal hover:bg-slate-100">
              <button
                type="button"
                data-goal={page.id}
                className="flex w-full justify-start px-24 py-12"
                onClick={handleSelectGoal}>
                {page.title}
              </button>
            </li>
          ))}
          {hasNextPage && <div ref={scrollRef}>로딩 중</div>}
        </ul>
      )}
    </div>
  );
}
