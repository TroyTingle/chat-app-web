"use client";
import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { create1To1Chat, createGroupChat } from '@/api/chats';

interface CreateChatProps {
  onClose: () => void;
}

const CreateChat: React.FC<CreateChatProps> = ({ onClose }) => {
  const [users, setUsers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddUser = () => {
    if (inputValue && !users.includes(inputValue)) {
      setUsers([...users, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteUser = (userToDelete: string) => {
    setUsers(users.filter((user) => user !== userToDelete));
  };

  const handleSubmit = () => {
    if (users.length === 0) {
      onClose();
    } else if (users.length === 1) {
      // Create a 1-2-1 chat
      create1To1Chat(users[0])
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.error('Error creating 1-2-1 chat:', error);
          throw error;
        });
    } else {
      // Create a group chat
      createGroupChat(users)
        .then(() => {
            onClose();
          })
          .catch((error) => {
            console.error('Error creating group chat:', error);
            throw error;
          });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h6' gutterBottom>
        Create a New Chat
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label='Add User'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddUser();
            }
          }}
          sx={{ mr: 2 }}
        />
        <Button variant='contained' color='primary' onClick={handleAddUser}>
          Add
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
        {users.map((user) => (
          <Chip
            key={user}
            label={user}
            onDelete={() => handleDeleteUser(user)}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant='contained' color='secondary' onClick={handleSubmit}>
          Create Chat
        </Button>
        <Button variant='outlined' color='error' onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CreateChat;
