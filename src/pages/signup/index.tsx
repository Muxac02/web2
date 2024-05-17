// import styles from "@/styles/Home.module.css";
// import React from "react";
// import {Button} from "@mui/material";
//
// export default function Signup() {
//     return (
//         <div>
//             <Button variant={"outlined"}>Outlined</Button>
//             <Button variant={"contained"}>Contained</Button>
//         </div>
//     )
// }
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { IconButton } from '@mui/material';
import { InputAdornment } from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


export default function SignUp() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('Username'),
            nickname: data.get('nickname'),
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    const [isUsernameError, setUsernameError] = React.useState("");
    const [Username, setUsername] = React.useState("");

    const [isNicknameError, setNicknameError] = React.useState("");
    const [Nickname, setNickname] = React.useState("");
    const [isNicknameFocused, setNicknameFocused] = React.useState(false);

    const [isEmailError, setEmailError] = React.useState("");
    const [Email, setEmail] = React.useState("");

    const [isPasswordError, setPasswordError] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        {/*<LockOutlinedIcon />*/}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="Username"
                                    required
                                    fullWidth
                                    id="Username"
                                    label="Username"
                                    helperText={isUsernameError}
                                    error={!!isUsernameError}
                                    onBlur={()=>{
                                        if (Username.length<3) {
                                            setUsernameError("Username should be at least 3 characters long")
                                        }
                                        if (!Username.match(/^[A-Za-z0-9]+$/g)) {
                                            setUsernameError("Username should contain only english letters or numbers")
                                        }
                                    }}
                                    onFocus={()=>{setUsernameError("")}}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="nickname"
                                    name="nickname"
                                    fullWidth
                                    id="nickname"
                                    label={isNicknameFocused ? "Nickname" : Username.length==0 ? "Nickname" : Nickname.length == 0?`${Username}`:`Nickname`}
                                    helperText={isNicknameError}
                                    error={!!isNicknameError}
                                    onBlur={()=>{
                                        if (isUsernameError)
                                        {
                                            if (Nickname.length < 3) {
                                                setNicknameError("Nickname should be at least 3 characters long")
                                            }
                                            if (!Nickname.match(/^[A-Za-z0-9]+$/g)) {
                                                setNicknameError("Nickname should contain only english letters or numbers")
                                            }
                                        }
                                        setNicknameFocused(false);
                                    }}
                                    onFocus={()=>{
                                        setNicknameError("");
                                        setNicknameFocused(true);
                                    }}
                                    onChange={(event) => setNickname(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    helperText={isEmailError}
                                    error={!!isEmailError}
                                    onBlur={()=>{
                                        if (Email.length<3) {
                                            setEmailError("Email should be at least 3 characters long")
                                        }
                                        if (!Email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                                            setEmailError("Non-existent Email address")
                                        }
                                    }}
                                    onFocus={()=>{setEmailError("")}}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword?"text":"password"}
                                    id="password"
                                    autoComplete="new-password"
                                    helperText={isPasswordError}
                                    error={!!isPasswordError}
                                    onBlur={()=>{
                                        if (!Password.match(/[A-Z]/g)) {
                                            setPasswordError("Password should contain at least 1 Uppercase symbol")
                                        }
                                        if (!Password.match(/[a-z]/g)) {
                                            setPasswordError("Password should contain at least 1 Lowercase symbol")
                                        }
                                        if (!Password.match(/[!?@#$%^&*()\-=_+:,./]/g)) {
                                            setPasswordError("Password should contain at least 1 special symbol")
                                        }
                                        if (Password.length<8) {
                                            setPasswordError("Password should be at least 8 characters long")
                                        }
                                        if (!Password.match(/^[A-z0-9!?@#$%^&*()\-=_+:,./]+$/g)) {
                                            setPasswordError("Password should be made of only english letters, numbers and next special symbols: !?@#$%^&*()-=_+:,./ ")
                                        }
                                    }}
                                    onFocus={()=>{setPasswordError("")}}
                                    onChange={(event) => setPassword(event.target.value)}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    tabIndex={-1}
                                                    aria-label="Посмотреть пороль"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    );
}