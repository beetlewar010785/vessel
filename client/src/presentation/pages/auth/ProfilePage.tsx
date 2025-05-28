import { Box, Avatar, Typography, Divider, Button, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppContext } from '../../../ioc/AppContext';
import { Role } from '../../../domain/auth';
import { AuthStateAuthorized } from '../../store/AuthStore';
import UnauthorizedComponent from '../../components/UnauthorizedComponent';

export default function ProfilePage() {
    const { authStore, logoutUseCase } = useAppContext();
    const authorizedState = authStore.authState.value as AuthStateAuthorized | null;

    const handleLogout = async () => {
        await logoutUseCase.execute();
    };

    const roleLabels: Record<Role, string> = {
        [Role.TechManager]: 'Tech Manager',
        [Role.Captain]: 'Captain',
        [Role.ChiefEngineer]: 'Chief Engineer',
    };

    if (!authorizedState) {
        return UnauthorizedComponent();
    }

    return (
        <Box sx={{ p: 4, maxWidth: 480, mx: 'auto' }}>
            <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: 'grey.300' }}>
                    <AccountCircleIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5">
                    {authorizedState.profile.name} {authorizedState.profile.surname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {roleLabels[authorizedState.profile.role]}
                </Typography>
            </Stack>

            <Divider sx={{ mb: 4 }} />

            <Stack spacing={2} sx={{ mb: 4 }}>
                <Box>
                    <Typography variant="caption" color="text.secondary">
                        Email
                    </Typography>
                    <Typography variant="body1">{authorizedState.profile.email}</Typography>
                </Box>

                {authorizedState.profile.vessel && (
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box>
                            <Typography variant="caption" color="text.secondary">
                                Vessel
                            </Typography>
                            <Typography variant="body1">
                                {authorizedState.profile.vessel}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Stack>

            <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
                Logout
            </Button>
        </Box>
    );
}
