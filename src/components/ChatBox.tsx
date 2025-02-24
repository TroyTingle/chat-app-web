import { Box, List, TextField } from "@mui/material";
import React from "react";
import useChatWebSocket from "../hooks/useChatWebSocket";
import { Message } from "../model/models";
import ChatMessage from "./ChatMessage";

const ChatBox: React.FC<{ chatId: string }> = () => {
  const { sendMessage } = useChatWebSocket("ID");
  const [newMessage, setNewMessage] = React.useState<string>("");

  const messages: Message[] = [];

  const handleSend = () => {
    sendMessage(newMessage, "ID", "me"); // Replace with actual user ID
    setNewMessage("");
  };

  return (
    <Box display='flex' flexDirection='column' height='100vh' width='82vw'>
      <Box flexGrow={1} overflow='auto' p={2}>
        <List>
          {messages.map((message: Message) => (
            <ChatMessage
              key={message.id} // Add a key prop to avoid React warnings
              message={message.content}
              timestamp={new Date(message.timestamp).toLocaleDateString()}
              isOwnMessage={message.senderUsername === "me"} // Replace with actual user ID
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
      </Box>
    </Box>
  );
};

export default ChatBox;
