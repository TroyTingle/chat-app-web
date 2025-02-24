import { Client, StompSubscription } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import { Chat, Message } from "../model/models";
import { SOCKET_URL } from "../utils/constants";

const useChatWebSocket = (chatId: Chat["id"] | null) => {
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    if (!chatId) return;

    const client = new Client({
      brokerURL: SOCKET_URL,
      reconnectDelay: 5000,
      onConnect: () => {
        subscriptionRef.current = client.subscribe(`/topic/chat/${chatId}`, () => {});
      },
      onDisconnect: () => console.warn("Disconnected from WebSocket"),
      onStompError: (frame) => console.error("STOMP Error:", frame),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      subscriptionRef.current?.unsubscribe();
      client.deactivate();
    };
  }, [chatId]);

  const sendMessage = (content: string, chatId: string, senderUsername: string) => {
    if (!clientRef.current || !clientRef.current.connected || !chatId) return;

    const payload: Message = {
      content,
      timestamp: new Date().toISOString(), // Convert timestamp to string
      senderUsername,
      chatId,
    };

    clientRef.current.publish({
      destination: `/app/chat/${chatId}`,
      body: JSON.stringify(payload),
    });
  };

  return { sendMessage };
};

export default useChatWebSocket;
