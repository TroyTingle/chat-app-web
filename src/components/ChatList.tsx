import { Chat } from "@/model/models";
import useChatStore from "@/store/chatStore";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, Fab, IconButton, Modal, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import CreateChat from "./CreateChat";

const ChatList = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { chats, fetchChats, setSelectedChatId, selectedChatId } = useChatStore();
  const isDesktop = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleNewChat = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    if (!isDesktop) {
      setDrawerOpen(false); // Close the drawer on mobile after selecting a chat
    }
  };

  const renderChatList = () => (
    <Box
      sx={{
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
          isSelected={chat.id === selectedChatId}
          onClick={() => handleChatSelect(chat.id)}
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

  return isDesktop ? (
    renderChatList()
  ) : (
    <Box
      sx={{
        borderRight: "1px solid #ccc",
        height: "100vh",
        position: "relative",
      }}
    >
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor='left' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {renderChatList()}
      </Drawer>
    </Box>
  );
};

export default ChatList;
