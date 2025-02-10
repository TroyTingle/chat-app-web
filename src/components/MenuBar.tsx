import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, List, ListItemButton, ListItemIcon } from '@mui/material';
import React from 'react';

const MenuBar: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100px',
        bgcolor: '#1c3045',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <List component='nav' sx={{ flexGrow: 1 }}>
        <ListItemButton
          sx={{ marginTop: '10px', marginBottom: '20px' }}
          LinkComponent={'a'}
          href='/'
        >
          <ListItemIcon>
            <HomeIcon sx={{ width: '50px', height: '50px' }} />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton
          sx={{ marginBottom: '20px' }}
          LinkComponent={'a'}
          href='/chat'
        >
          <ListItemIcon>
            <ChatIcon sx={{ width: '50px', height: '50px' }} />
          </ListItemIcon>
        </ListItemButton>
      </List>
      <List component='nav'>
        <ListItemButton
          sx={{ marginBottom: '10px' }}
          LinkComponent={'a'}
          href='/settings'
        >
          <ListItemIcon>
            <SettingsIcon sx={{ width: '50px', height: '50px' }} />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default MenuBar;
