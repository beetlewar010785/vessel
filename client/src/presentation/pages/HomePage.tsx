import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface HomePageProps {
  onNavigate: (page: 'requests' | 'profile' | 'request') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <Card>
          <CardActionArea onClick={() => onNavigate('requests')}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ListIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Requests</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid size={6}>
        <Card>
          <CardActionArea onClick={() => onNavigate('profile')}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <AccountCircleIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Profile</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
