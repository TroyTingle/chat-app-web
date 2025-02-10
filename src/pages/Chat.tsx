import { Box } from '@mui/material';
import ChatList from '../components/ChatList';
import MenuBar from '../components/MenuBar';

const Chat: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <MenuBar />
      <ChatList />
    </Box>
  );
};

export default Chat;
