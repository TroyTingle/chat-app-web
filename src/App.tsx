import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router';
import Chat from './pages/Chat';
import SignIn from './pages/SignIn';
import Signup from './pages/Signup';

export const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/chat' element={<Chat />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
