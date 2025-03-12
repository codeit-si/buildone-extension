import { useCallback, useEffect, useRef, useState } from 'react';

import type { InfiniteQueryObserverResult } from '@tanstack/react-query';

interface useIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useInfiniteScroll = ({ threshold = 0.1, hasNextPage, fetchNextPage }: useIntersectionObserverProps) => {
  const [rerender, setRerender] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 첫 화면 렌더링 때 포함되지 않는 태그를 감지하기 위해 사용
  const refTrigger = useCallback(() => {
    setRerender(prev => !prev);
  }, []);

  const observerCallback: IntersectionObserverCallback = useCallback(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) fetchNextPage();
      });
    },
    [hasNextPage, fetchNextPage],
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observerCallback, threshold, rerender]);

  return { ref, refTrigger };
};
