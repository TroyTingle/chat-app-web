import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getChats } from '../api/chats';
import { Chat } from '../model/models';
import ChatListItem from './ChatListItem';
import CreateChat from './CreateChat';

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<Chat['id']>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChats();
        setChats(response);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  const handleNewChat = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: '15vw',
        borderRight: '1px solid #ccc',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, p: 2 }}>
        <Typography variant='h3' sx={{ flexGrow: 1 }}>
          Chats
        </Typography>
        <Fab color='primary' aria-label='add' onClick={handleNewChat}>
          <AddIcon />
        </Fab>
      </Box>

      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chatName={chat.name}
          lastMessage={chat.messages[chat.messages.length - 1]?.content}
          isSelected={chat.id === selectedChatId}
          onClick={() => setSelectedChatId(chat.id)}
        />
      ))}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
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
