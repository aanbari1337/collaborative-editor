import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const SOCKET_URL = "http://localhost:8080/ws"; // Backend STOMP endpoint

let stompClient = null;

export const connectSocket = (onMessageReceived) => {
  const socket = new SockJS(SOCKET_URL);
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000, // Auto-reconnect on failure
    onConnect: () => {
      console.log("Connected to WebSocket");

      // Subscribe to a topic
      stompClient.subscribe("/topic/messages", (message) => {
        if (message.body) {
          onMessageReceived(JSON.parse(message.body));
        }
      });
    },
    onStompError: (error) => {
      console.error("STOMP error:", error);
    },
  });

  stompClient.activate();
};

export const sendMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: "/app/message", // Match backend's destination prefix
      body: JSON.stringify(message),
    });
  } else {
    console.error("Cannot send message: Not connected");
  }
};

export const disconnectSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log("Disconnected from WebSocket");
  }
};
