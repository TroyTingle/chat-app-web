import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await axios.post("/api/auth/login", { email, password });
    if (response.status === 200) {
      login(response.data.user);
      navigate("/");
    } else {
      setError("Login Failed");
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "650px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>Sign In</Typography>
        {error && (
          <Typography color='error' sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Box
            sx={{
              mt: 2,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1, height: "1px", backgroundColor: "grey.500" }} />
            <Typography variant='body2' sx={{ mx: 2 }}>
              Or
            </Typography>
            <Box sx={{ flex: 1, height: "1px", backgroundColor: "grey.500" }} />
          </Box>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to='/signup'>Sign Up</Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
