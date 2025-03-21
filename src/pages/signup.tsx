"use client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, {FormEvent, useState} from "react";
import { api } from "@/config/axiosConfig";
import Link from "next/link";
import {router} from "next/client";

const Signup = () => {
    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const username = formData.get('username');
        if (!email || !password || !username) {
            setError("All fields are required");
        } else {
            setError("");
            const response = await api.post("/api/auth/signup", {email, password, username});
            if (response.status === 200) {
                await router.push("/login");
            } else {
                setError(response.data);
            }
        }
    }
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
                        name='username'
                        margin='normal'
                        type='input'
                        error={!!error}
                    />
                    <TextField
                        fullWidth
                        label='Email Address'
                        name='email'
                        margin='normal'
                        type='input'
                        error={!!error}
                    />
                    <TextField
                        fullWidth
                        label='Password'
                        name='password'
                        margin='normal'
                        type='password'
                        error={!!error}
                    />
                    <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                        Signup
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
                        <Link href='/login'>Sign In</Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;
