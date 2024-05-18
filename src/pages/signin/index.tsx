import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Checkbox, FormControlLabel } from '@mui/material';
import {FormEvent, useState} from "react";


export default function SignUp() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: username,
            password: password,
            remember: Remember
        });
    };
    const [username, setUsername] = useState("");
    const [isUsernameError, setUsernameError] = useState("");
    const [Remember, setRemember] = useState(false);

    const [isPasswordError, setPasswordError] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {/*user*/}
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Enter your username"
                                helperText={isUsernameError}
                                error={!!isUsernameError}
                                onBlur={()=>{
                                    if (username.length==0) {
                                        setUsernameError("Please enter username")
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
                                label="password"
                                type={"password"}
                                id="password"
                                autoComplete="new-password"
                                helperText={isPasswordError}
                                error={!!isPasswordError}
                                onBlur={()=>{
                                    if (password.length==0) {
                                        setPasswordError("Please enter password")
                                    }
                                }}
                                onFocus={()=>{setPasswordError("")}}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox
                                color="primary"
                                onClick={()=>{
                                setRemember(!Remember);
                                }}
                            />}
                            label="Remember me"
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
                            <Link href="/signup" variant="body2">
                                New here? Sign up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}