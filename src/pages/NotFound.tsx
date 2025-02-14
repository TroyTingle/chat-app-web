import { Box, Typography } from '@mui/material';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant='h1'>404</Typography>
      <Typography variant='h6'>Page Not Found</Typography>
      <Link to='/'>Go to Home</Link>
    </Box>
  );
};

export default NotFound;
