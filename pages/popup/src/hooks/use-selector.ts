import { useCallback, useEffect, useRef, useState } from 'react';

const useSelector = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | HTMLInputElement>(null);

  const toggleHandler = () => setIsOpen(!isOpen);

  const handleClickOutside = useCallback(
    (e: React.BaseSyntheticEvent | MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(prev => !prev);
    },
    [ref, setIsOpen],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside);
      return () => window.removeEventListener('click', handleClickOutside);
    }
    return;
  }, [isOpen, handleClickOutside]);

  return { isOpen, ref, toggleHandler };
};

export default useSelector;
