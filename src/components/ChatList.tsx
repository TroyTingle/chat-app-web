import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { Chat } from "../model/models";
import ChatListItem from "./ChatListItem";
import CreateChat from "./CreateChat";

const ChatList = () => {
  const [open, setOpen] = useState(false);
  const chats: Chat[] = [];
  const selectedChatId = "selectedID";

  const handleNewChat = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "15vw",
        borderRight: "1px solid #ccc",
        height: "100vh",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mt: 1, p: 2 }}>
        <Typography variant='h3' sx={{ flexGrow: 1 }}>
          Chats
        </Typography>
        <Fab color='primary' aria-label='add' onClick={handleNewChat}>
          <AddIcon />
        </Fab>
      </Box>

      {chats.map((chat: Chat) => (
        <ChatListItem
          key={chat.id}
          chatName={chat.name}
          lastMessage={chat.messages ? chat.messages[chat.messages.length - 1]?.content : ""}
          isSelected={chat.id === selectedChatId}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      ))}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CreateChat onClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default ChatList;
