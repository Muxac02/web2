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
import {useSignupMutation} from "@/store/authApi";


export default function SignUp() {

    const [isUsernameError, setUsernameError] = React.useState("");
    const [username, setUsername] = React.useState("");

    const [isNicknameError, setNicknameError] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [isNicknameFocused, setNicknameFocused] = React.useState(false);

    const [isEmailError, setEmailError] = React.useState("");
    const [email, setEmail] = React.useState("");

    const [isPasswordError, setPasswordError] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const [repeatPassword, setrepeatPassword] = React.useState("");
    const [isrepeatPasswordError, setrepeatPasswordError] = React.useState("");
    const [showrepeatPassword, setShowrepeatPassword] = React.useState(false);
    const handleClickShowrepeatPassword = () => setShowrepeatPassword(!showrepeatPassword);


    const [signup] = useSignupMutation();


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = new FormData(event.currentTarget);
            if (!isUsernameError && !isNicknameError && !isEmailError && !isPasswordError && repeatPassword === password) {
                signup({username, nickname, email, password})
            }
    };

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
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="username"
                                    value={username}
                                    helperText={isUsernameError}
                                    error={!!isUsernameError}
                                    onBlur={()=>{
                                        if (username.length<3) {
                                            setUsernameError("username should be at least 3 characters long")
                                        }
                                        if (!username.match(/^[A-Za-z0-9]+$/g)) {
                                            setUsernameError("username should contain only english letters or numbers")
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
                                    value={nickname}
                                    label={isNicknameFocused ? "nickname" : username.length==0 ? "nickname" : nickname.length == 0?`${username}`:`Nickname`}
                                    helperText={isNicknameError}
                                    error={!!isNicknameError}
                                    onBlur={()=>{
                                        if (isUsernameError)
                                        {
                                            if (nickname.length < 3) {
                                                setNicknameError("nickname should be at least 3 characters long")
                                            }
                                            if (!nickname.match(/^[A-Za-z0-9]+$/g)) {
                                                setNicknameError("nickname should contain only english letters or numbers")
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
                                    label="email Address"
                                    name="email"
                                    value={email}
                                    autoComplete="email"
                                    helperText={isEmailError}
                                    error={!!isEmailError}
                                    onBlur={()=>{
                                        if (email.length<3) {
                                            setEmailError("email should be at least 3 characters long")
                                        }
                                        if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                                            setEmailError("Non-existent email address")
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
                                    label="password"
                                    value={password}
                                    type={showPassword?"text":"password"}
                                    id="password"
                                    autoComplete="new-password"
                                    helperText={isPasswordError}
                                    error={!!isPasswordError}
                                    onBlur={()=>{
                                        if (!password.match(/[A-Z]/g)) {
                                            setPasswordError("password should contain at least 1 Uppercase symbol")
                                        }
                                        if (!password.match(/[a-z]/g)) {
                                            setPasswordError("password should contain at least 1 Lowercase symbol")
                                        }
                                        if (!password.match(/[!?@#$%^&*()\-=_+:,./]/g)) {
                                            setPasswordError("password should contain at least 1 special symbol")
                                        }
                                        if (password.length<8) {
                                            setPasswordError("password should be at least 8 characters long")
                                        }
                                        if (!password.match(/^[A-z0-9!?@#$%^&*()\-=_+:,./]+$/g)) {
                                            setPasswordError("password should be made of only english letters, numbers and next special symbols: !?@#$%^&*()-=_+:,./ ")
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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="repeatpassword"
                                    label="Repeat password"
                                    value={repeatPassword}
                                    type={showrepeatPassword?"text":"password"}
                                    id="repeatpassword"
                                    autoComplete="new-repeatpassword"
                                    helperText={isrepeatPasswordError}
                                    error={!!isrepeatPasswordError}
                                    onBlur={()=>{
                                        if (!(repeatPassword == password)) {
                                            setrepeatPasswordError("Passwords are not same")
                                        }
                                    }}
                                    onFocus={()=>{setrepeatPasswordError("")}}
                                    onChange={(event) => setrepeatPassword(event.target.value)}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    tabIndex={-1}
                                                    aria-label="Посмотреть пороль"
                                                    onClick={handleClickShowrepeatPassword}
                                                >
                                                    {showrepeatPassword ? <Visibility /> : <VisibilityOff />}
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