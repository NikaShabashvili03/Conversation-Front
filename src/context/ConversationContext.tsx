import React, { useEffect, useState, createContext } from 'react';

// Create a WebSocket context
export const ConversationSocketContext = createContext<WebSocket | null>(null);

export const ConversationContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const conversationSocket = new WebSocket(`ws://localhost:8000/ws/conversation/`);

    conversationSocket.onopen = () => {
      console.log('WebSocket connection Conversation established');
    };

    conversationSocket.onclose = () => {
      console.log('WebSocket connection Conversation closed');
    };

    setSocket(conversationSocket);

    return () => {
      conversationSocket.close();
    };
  }, []);

  return (
    <ConversationSocketContext.Provider value={socket}>
      {children}
    </ConversationSocketContext.Provider>
  );
};
