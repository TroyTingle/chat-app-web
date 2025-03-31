import { Box, Typography } from "@mui/material";
import React from "react";

interface ChatMessageProps {
  message: string;
  timestamp: Date;
  isOwnMessage: boolean;
}

const formatTimestamp = (timestamp: Date) => {
  const now = new Date();
  const isToday =
    timestamp.getDate() === now.getDate() &&
    timestamp.getMonth() === now.getMonth() &&
    timestamp.getFullYear() === now.getFullYear();

  if (isToday) {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return `${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, timestamp, isOwnMessage }) => {
  return (
    <Box display='flex' flexDirection={isOwnMessage ? "row-reverse" : "row"} alignItems='center' mb={2}>
      <Box
        ml={isOwnMessage ? 2 : 0}
        mr={isOwnMessage ? 0 : 2}
        p={2}
        bgcolor={isOwnMessage ? "primary.main" : "grey.300"}
        color={isOwnMessage ? "white" : "black"}
        borderRadius={4}
      >
        <Typography variant='body1'>{message}</Typography>
        <Typography variant='caption' display='block' textAlign={isOwnMessage ? "right" : "left"}>
          {formatTimestamp(timestamp)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
