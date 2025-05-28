import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function UnauthorizedComponent() {
  return (
    <Box sx={{ p: 4, maxWidth: 480, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Unauthorized Access
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Please log in or try again later.
      </Typography>
    </Box>
  );
}
