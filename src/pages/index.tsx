import ChatBox from "@/components/ChatBox";
import ChatList from "@/components/ChatList";
import { Box } from "@mui/material";
import React from "react";

const Chat: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <Box sx={{ flex: "0 0 auto" }}>
        <ChatList />
      </Box>
      <Box sx={{ flex: "1 1 auto" }}>
        <ChatBox />
      </Box>
    </Box>
  );
};

export default Chat;
