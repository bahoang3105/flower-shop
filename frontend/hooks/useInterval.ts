import { MutableRefObject, useEffect, useMemo, useRef } from 'react';

export function useInterval(callback: Function, interval: number | undefined) {
  const intervalId: MutableRefObject<null | number> = useRef(null);
  const handler = useMemo(() => {
    return {
      start(overrideInterval: number | undefined = undefined): void {
        handler.stop();
        intervalId.current = setInterval(callback, overrideInterval === undefined ? interval : overrideInterval);
      },

      stop(): void {
        if (intervalId.current) {
          clearInterval(intervalId.current);
        }
      },

      restart() {
        handler.stop();
        handler.start();
      },
    };
  }, [callback, interval]);

  useEffect(() => {
    return () => {
      handler.stop();
    };
  }, []);

  return handler;
}
