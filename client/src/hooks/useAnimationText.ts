import { useEffect, useMemo, useRef, useState } from 'react';

type TUseAnimationText = (
  text: string,
  isReady?: boolean,
  speed?: number
) => { text: string[] };

interface IText {
  current: string;
  prev: string;
  inx: number;
}

const useAnimationText: TUseAnimationText = (
  textForAnimation,
  isReady,
  speed = 40
) => {
  const timer = useRef<any>(undefined);

  const defaultText = useMemo(
    () => ({
      current: '',
      prev: textForAnimation,
      inx: 0,
    }),
    [textForAnimation]
  );
  const [text, setText] = useState<IText>(defaultText);

  const timerCallback = () => {
    setText((prev) => {
      if (prev.prev.length === 0) {
        clearInterval(timer.current);
        return prev;
      }
      return {
        current: (prev.current || '') + prev.prev.slice(0, 1),
        prev: prev.prev.slice(1, prev.prev.length),
        inx: ++prev.inx,
      };
    });
  };

  useEffect(() => {
    if (!isReady) {
      clearInterval(timer.current);
      return setText(defaultText);
    }

    timer.current = setInterval(timerCallback, speed);
    return () => clearInterval(timer.current);
  }, [defaultText, isReady, speed]);

  return { text: text.current.split('\n') };
};
export default useAnimationText;
