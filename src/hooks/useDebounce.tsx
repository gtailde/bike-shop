import { useCallback, useRef } from 'react';
export default function useDebounce<T>(callback: Function, delay: number) {
  const timer = useRef<NodeJS.Timeout>();
  const debouncedCallback = useCallback(
    (...args: T[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        // eslint-disable-next-line n/no-callback-literal
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
  return debouncedCallback;
}
