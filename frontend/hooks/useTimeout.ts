import { MutableRefObject, useEffect, useMemo, useRef } from 'react';

export function useTimeout(callback: Function, timeout = 0): any {
  const timeoutId: MutableRefObject<null | number> = useRef(null);
  const handler = useMemo(() => {
    return {
      start(overrideTimeout: number | undefined = undefined): void {
        handler.stop();
        timeoutId.current = setTimeout(callback, overrideTimeout === undefined ? timeout : overrideTimeout);
      },

      stop(): void {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
      },

      restart(): void {
        handler.stop();
        handler.start();
      },
    };
  }, [callback, timeout]);

  useEffect(() => {
    return () => {
      handler.stop();
    };
  }, []);

  return handler;
}
