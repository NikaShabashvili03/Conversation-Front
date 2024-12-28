import React, { useEffect, useState, createContext } from 'react';

// Create a WebSocket context
export const TypingSocketContext = createContext<WebSocket | null>(null);

export const TypingContext: React.FC<{ children: React.ReactNode, id: string | undefined }> = ({ children, id }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const typingSocket = new WebSocket(`ws://localhost:8000/ws/${id}/typing/`);

    typingSocket.onopen = () => {
      console.log('WebSocket connection typing established');
    };

    typingSocket.onclose = () => {
      console.log('WebSocket connection typing closed');
    };

    setSocket(typingSocket);

    return () => {
      typingSocket.close();
    };
  }, [id]);

  return (
    <TypingSocketContext.Provider value={socket}>
      {children}
    </TypingSocketContext.Provider>
  );
};
