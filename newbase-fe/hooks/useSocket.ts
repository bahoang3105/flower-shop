import { useEffect } from 'react';
import { isArray } from 'lodash';

import Socket from 'services/SocketService';

export const useSocket = ({
  event,
  handleEvent,
  dependences,
  nonAuthen,
}: {
  event: string | string[];
  handleEvent: any;
  dependences?: any;
  nonAuthen?: boolean;
}) => {
  const token = 'aaaa';

  useEffect(() => {
    const socketIo = new Socket();
    const socketInstance = socketIo.getInstance(token);
    if (token || nonAuthen) {
      if (typeof event === 'string') {
        socketInstance.on(event, handleEvent);
      } else if (isArray(event)) {
        event.forEach((e: string) => {
          socketInstance.on(e, handleEvent);
        });
      }
    }
    return () => {
      if (token || nonAuthen) {
        if (typeof event === 'string') {
          socketInstance.off(event, handleEvent);
        } else if (isArray(event)) {
          event.forEach((e: string) => {
            socketInstance.off(e, handleEvent);
          });
        }
      }
    };
  }, [token, ...(dependences || [])]);
};
