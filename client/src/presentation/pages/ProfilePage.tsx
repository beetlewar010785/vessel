import { Box, Avatar, Typography, Divider, Button, Stack } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import { useAppContext } from '../../ioc/AppContext';
import { Role } from '../../domain/auth';

export default function ProfilePage() {
  const { authStore, logoutUseCase } = useAppContext();
  const profile = authStore.profile;

  const handleLogout = async () => {
    await logoutUseCase.execute();
  };

  const roleLabels: Record<Role, string> = {
    [Role.TechManager]: 'Tech Manager',
    [Role.Captain]: 'Captain',
    [Role.ChiefEngineer]: 'Chief Engineer',
  };

  if (!profile.value) {
    return (
      <Box sx={{ p: 4, maxWidth: 480, mx: 'auto', textAlign: 'center' }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: 'grey.300', mx: 'auto', mb: 2 }}>
          <AccountCircleIcon fontSize="large" />
        </Avatar>
        <Typography variant="h6" gutterBottom>
          No profile loaded
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please log in or try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 480, mx: 'auto' }}>
      <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: 'grey.300' }}>
          <AccountCircleIcon fontSize="large" />
        </Avatar>
        <Typography variant="h5">
          {profile.value.name} {profile.value.surname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {roleLabels[profile.value.role]}
        </Typography>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      <Stack spacing={2} sx={{ mb: 4 }}>
        {profile.value.vessel && (
          <Box display="flex" alignItems="center" gap={1}>
            <DirectionsBoatIcon fontSize="small" color="action" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Vessel
              </Typography>
              <Typography variant="body1">{profile.value.vessel}</Typography>
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
