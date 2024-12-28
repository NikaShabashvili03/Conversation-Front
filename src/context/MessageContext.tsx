import React, { useEffect, useState, createContext } from 'react';

// Create a WebSocket context
export const MessageSocketContext = createContext<WebSocket | null>(null);

export const MessageContext: React.FC<{ children: React.ReactNode, id: string | undefined }> = ({ children, id }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const messageSocket = new WebSocket(`ws://localhost:8000/ws/${id}/messages/`);

    messageSocket.onopen = () => {
      console.log('WebSocket connection Message established');
    };

    messageSocket.onclose = () => {
      console.log('WebSocket connection Message closed');
    };

    setSocket(messageSocket);

    return () => {
      messageSocket.close();
    };
  }, [id]);

  return (
    <MessageSocketContext.Provider value={socket}>
      {children}
    </MessageSocketContext.Provider>
  );
};
