import React, { useEffect, useState, createContext } from 'react';

export const OnlineSocketContext = createContext<WebSocket | null>(null);

export const OnlineContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const onlineSocket = new WebSocket(`ws://localhost:8000/ws/online/`);

    onlineSocket.onopen = () => {
      console.log('WebSocket connection online established');
    };

    onlineSocket.onclose = () => {
      console.log('WebSocket connection online closed');
    };

    setSocket(onlineSocket);

    return () => {
      onlineSocket.close();
    };
  }, []);

  return (
    <OnlineSocketContext.Provider value={socket}>
      {children}
    </OnlineSocketContext.Provider>
  );
};
