import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import useAuthStore from "./store/authStore";

export const App = () => {
  const theme = createTheme();
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Chat />} />
            </Route>
            <Route path='/login' element={<SignIn />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  );
};
