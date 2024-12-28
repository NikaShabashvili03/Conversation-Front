import { useEffect } from 'react';

type WebSocketMessageHandler<T> = (data: T) => void;

const useWebSocket = <T>(url: string, onMessage: WebSocketMessageHandler<T>) => {
    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws${url}/`);

        socket.onopen = () => {
            console.log(`WebSocket connection ${url} established`);
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data)
        };

        socket.onclose = () => {
            console.log(`WebSocket connection ${url} closed`);
        };

        return () => {
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
              socket.close();
            }
            console.log("WebSocket cleaned up.");
          };
    }, [url, onMessage]);
};

export default useWebSocket;