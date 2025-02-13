import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Email and password are required');
    } else {
      setError('');
      // TODO: call api and redirect to signin
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Signup</Typography>
        {error && (
          <Typography color='error' sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label='Username'
            margin='normal'
            type='input'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!error}
          />
          <TextField
            fullWidth
            label='Email Address'
            margin='normal'
            type='input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
          />
          <TextField
            fullWidth
            label='Password'
            margin='normal'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Signup
          </Button>
          <Box
            sx={{
              mt: 2,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ flex: 1, height: '1px', backgroundColor: 'grey.500' }} />
            <Typography variant='body2' sx={{ mx: 2 }}>
              Or
            </Typography>
            <Box sx={{ flex: 1, height: '1px', backgroundColor: 'grey.500' }} />
          </Box>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link to='/signin'>Sign In</Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
