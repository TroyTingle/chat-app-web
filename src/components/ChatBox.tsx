import { Box, Button, List, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Message } from '../model/models';
import ChatMessage from './ChatMessage';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    console.log('Sending message:', input);
  };

  return (
    <Box display='flex' flexDirection='column' height='100vh' width='82vw'>
      <Box flexGrow={1} overflow='auto' p={2}>
        <List>
          {messages.map((message) => (
            <ChatMessage
              message={message.content}
              timestamp={message.timestamp.toLocaleDateString()}
              isOwnMessage={true}
            />
          ))}
        </List>
      </Box>
      <Box display='flex' p={2} borderTop='1px solid #ccc'>
        <TextField
          fullWidth
          variant='outlined'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <Button variant='contained' color='primary' onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
