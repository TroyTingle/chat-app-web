import { Box } from '@mui/material';
import ChatBox from '../components/ChatBox';
import ChatList from '../components/ChatList';
import MenuBar from '../components/MenuBar';

const Chat: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <MenuBar />
      <ChatList />
      <ChatBox />
    </Box>
  );
};

export default Chat;
