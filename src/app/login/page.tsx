"use client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import {loginSchema} from "@/validation/login";
import {BASE_API_URL} from "@/utils/constants";
import { useRouter } from 'next/navigation'

const Page = () => {
    const [error, setError] = useState("");
    const [formErrors, setFormErrors] = useState<{ username?: string; password?: string }>({});
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setFormErrors({});

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        // Validate using Zod
        const result = loginSchema.safeParse({ username, password });
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            setFormErrors({
                username: errors.username?.[0],
                password: errors.password?.[0],
            });
            return;
        }
        const response = await fetch(BASE_API_URL + "/api/auth/login",{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            await router.push("/");
        } else if (response.status < 500) {
            setError("Invalid username or password");
        } else {
            setError("Something went wrong, please try again later");
        }
    };
    return (
        <Container
            component="main"
            maxWidth="xs"
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
                <Typography variant="h5">Sign In</Typography>
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        type="text"
                        name="username"
                        error={!!formErrors.username}
                        helperText={formErrors.username}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        margin="normal"
                        type="password"
                        name="password"
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
                        <Typography variant="body2" sx={{ mx: 2 }}>
                            Or
                        </Typography>
                        <Box sx={{ flex: 1, height: "1px", backgroundColor: "grey.500" }} />
                    </Box>
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Link href="/signup">Sign Up</Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Page;
