import { useEffect, useState } from 'react';

function useDebounce<T>(defaultValue: T, callback = () => {}, delay?: number) {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    const timer = setTimeout(() => callback(), delay || 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { value, setValue };
}

export default useDebounce;
