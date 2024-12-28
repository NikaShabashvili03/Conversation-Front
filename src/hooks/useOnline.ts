import { useContext, useEffect, useState } from "react";
import { OnlineSocketContext } from '../context/OnlineContext';

interface UseOnlineProps {
  id?: number;
  userStatus?: boolean;
}

export default function useOnline({ id, userStatus }: UseOnlineProps) {
  const [online, setOnline] = useState(false);
  const onlineSocket = useContext(OnlineSocketContext);

  useEffect(() => {
    if (onlineSocket) {
      const handleMessage = (event: MessageEvent) => {
        if (id !== undefined && event.data.includes(id.toString())) {
          setOnline(true);
        } else {
          setOnline(false);
        }
      };

      onlineSocket.addEventListener('message', handleMessage);

      return () => {
        onlineSocket.removeEventListener('message', handleMessage);
      };
    }
  }, [onlineSocket, id]);

  useEffect(() => {
    if (userStatus !== undefined) {
      setOnline(userStatus);
    }
  }, [userStatus]); 

  return online;
}
