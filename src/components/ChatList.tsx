import { Box } from '@mui/material';
import React from 'react';
import ChatListItem from './ChatListItem';

const chats = [
  {
    id: 1,
    name: 'Chat 1',
    lastMessage: 'Hello there how are you today this is still not 30 ',
  },
  {
    id: 2,
    name: 'Chat 2',
    lastMessage: 'Hi',
  },
  {
    id: 3,
    name: 'Chat 3',
    lastMessage: 'Hey',
  },
];

const ChatList: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = React.useState<number | null>(
    null
  );
  return (
    <Box>
      {chats.map((chat) => (
        <ChatListItem
          key={chat.id}
          chatName={chat.name}
          lastMessage={chat.lastMessage}
          isSelected={chat.id === selectedChatId}
          onClick={() => setSelectedChatId(chat.id)}
        />
      ))}
    </Box>
  );
};

export default ChatList;
