import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import RequestsPage from './RequestsPage';
import CreateRequestPage from './CreateRequestPage';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import { useAppContext } from '../../ioc/AppContext';

export default function WelcomePage() {
  const { authStore, logoutUseCase } = useAppContext();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUseCase.execute().catch((err) => console.error(err));
  };

  const profile = authStore.profile.value;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            fontWeight={500}
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            onClick={() => navigate('/')}
          >
            {profile?.vessel ? `🚢 ${profile.vessel}` : '🧑‍💼 Crew Portal'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem component={Link} to="/" onClick={() => setDrawerOpen(false)}>
            <HomeIcon sx={{ mr: 2 }} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/requests" onClick={() => setDrawerOpen(false)}>
            <ListIcon sx={{ mr: 2 }} />
            <ListItemText primary="Requests" />
          </ListItem>
          <ListItem component={Link} to="/profile" onClick={() => setDrawerOpen(false)}>
            <AccountCircleIcon sx={{ mr: 2 }} />
            <ListItemText primary="Profile" />
          </ListItem>

          <Divider sx={{ my: 1 }} />

          <ListItem
            component="button"
            sx={{ width: '100%', textAlign: 'left' }}
            onClick={() => {
              handleLogout();
            }}
          >
            <LogoutIcon sx={{ mr: 2, color: 'error.main' }} />
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ padding: 2, pt: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage onNavigate={(page) => navigate('/' + page)} />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/request" element={<CreateRequestPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Box>
    </Box>
  );
}
