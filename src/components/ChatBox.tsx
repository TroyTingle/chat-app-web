import { Box, List, TextField } from "@mui/material";
import React, { useEffect } from "react";
import useChatWebSocket from "@/hooks/useChatWebSocket";
import { Message } from "@/model/models";
import useChatStore from "@/store/chatStore";
import useMessageStore from "@/store/messageStore";
import ChatMessage from "./ChatMessage";
import useUserStore from "@/store/userStore";

const ChatBox: React.FC = () => {
  const { selectedChatId } = useChatStore();
    const { user, fetchUser } = useUserStore();
  const { sendMessage } = useChatWebSocket(selectedChatId);
  const { messagesByChatId, fetchMessages } = useMessageStore();
  const [newMessage, setNewMessage] = React.useState<string>("");

  useEffect(() => {
    if (selectedChatId) {
      fetchMessages(selectedChatId);
    }
    if (!user){
        fetchUser();
    }
  }, [selectedChatId, fetchMessages, user, fetchUser]);

  const messages = selectedChatId ? messagesByChatId[selectedChatId] || [] : [];

  const handleSend = () => {
    if (selectedChatId) {
      sendMessage(newMessage, selectedChatId, user!.username); // Replace with actual user ID
      setNewMessage("");
    }
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
              isOwnMessage={message.senderUsername === user?.username} // Replace with actual user ID
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
