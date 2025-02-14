import { Box, Typography } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
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
          <Typography variant='h1'>Something went wrong</Typography>
          <Typography variant='h6'>An unexpected error occurred</Typography>
          <Link to='/'>Go to Home</Link>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
