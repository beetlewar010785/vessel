import { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    InputAdornment,
    FormControl,
    InputLabel,
    OutlinedInput,
    IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useAppContext } from '../../../ioc/AppContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../../ioc/SnackbarContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginPage() {
    const showMessage = useSnackbar();
    const { loginUseCase } = useAppContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        try {
            await loginUseCase.execute({ email, password });
            navigate('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(`Failed to login: ${err.message}`);
                showMessage(err.message, 'error');
            } else {
                console.error(`Failed to login`);
                showMessage('Unknown error', 'error');
            }
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                px: 2,
            }}
        >
            <Card sx={{ width: 360, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Sign In
                    </Typography>

                    <Box display="flex" flexDirection="column" gap={2} mt={2}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                id="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PersonOutlineIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <Button variant="contained" fullWidth onClick={handleSubmit}>
                            Login
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
