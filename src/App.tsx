import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';

export const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <Routes>
              <Route path='/' element={<ProtectedRoute element={<Chat />} />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};
