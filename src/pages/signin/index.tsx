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
    const [Username, setUsername] = React.useState("");
    const [isUsernameError, setUsernameError] = React.useState("");

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
                        {/*user*/}
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="Username"
                                required
                                fullWidth
                                id="Username"
                                label="Enter your username or email"
                                helperText={isUsernameError}
                                error={!!isUsernameError}
                                onBlur={()=>{
                                    if (Username.length==0) {
                                        setUsernameError("Please enter username or email")
                                    }
                                }}
                                onFocus={()=>{setUsernameError("")}}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Grid>
                        {/*password*/}
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
                                    if (Password.length==0) {
                                        setPasswordError("Please enter password")
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
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}