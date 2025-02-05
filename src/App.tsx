import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';

export const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
