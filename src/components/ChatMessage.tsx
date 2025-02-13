import { Box, Typography } from '@mui/material';
import React from 'react';

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isOwnMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  timestamp,
  isOwnMessage,
}) => {
  return (
    <Box
      display='flex'
      flexDirection={isOwnMessage ? 'row-reverse' : 'row'}
      alignItems='center'
      mb={2}
    >
      <Box
        ml={isOwnMessage ? 2 : 0}
        mr={isOwnMessage ? 0 : 2}
        p={2}
        bgcolor={isOwnMessage ? 'primary.main' : 'grey.300'}
        color={isOwnMessage ? 'white' : 'black'}
        borderRadius={4}
      >
        <Typography variant='body1'>{message}</Typography>
        <Typography
          variant='caption'
          display='block'
          textAlign={isOwnMessage ? 'right' : 'left'}
        >
          {timestamp}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
