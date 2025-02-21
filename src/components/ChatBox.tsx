import { Box, Button, List, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { getMessages } from "../api/messages";
import useChatWebSocket from "../hooks/useChatWebSocket";
import { Message } from "../model/models";
import { useAuthStore } from "../store/authStore";
import useChatStore from "../store/chatStore";
import ChatMessage from "./ChatMessage";

const ChatBox: React.FC<{ chatId: string }> = () => {
  const user = useAuthStore((state) => state.user)!;
  const chatId = useChatStore((state) => state.selectedChatId);
  const messages = useChatStore((state) => state.messages[chatId || ""] || []);
  const setMessages = useChatStore((state) => state.setMessages);
  const { sendMessage } = useChatWebSocket(chatId);
  const [newMessage, setNewMessage] = React.useState<string>("");

  const handleSend = () => {
    sendMessage(newMessage, chatId!, user.username); // Replace with actual user ID
    setNewMessage("");
  };

  useEffect(() => {
    if (chatId) {
      getMessages(chatId).then((messages) => setMessages(chatId, messages));
    }
  }, [chatId, setMessages]);

  if (!chatId) {
    return <Box>Please select a chat to start Messaging</Box>;
  }

  return (
    <Box display='flex' flexDirection='column' height='100vh' width='82vw'>
      <Box flexGrow={1} overflow='auto' p={2}>
        <List>
          {messages.map((message: Message) => (
            <ChatMessage
              message={message.content}
              timestamp={new Date(message.timestamp).toLocaleDateString()}
              isOwnMessage={message.senderUsername === user.username} // Replace with actual user ID
            />
          ))}
        </List>
      </Box>
      <Box display='flex' p={2} borderTop='1px solid #ccc'>
        <TextField
          fullWidth
          variant='outlined'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <Button variant='contained' color='primary' onClick={() => handleSend()}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
