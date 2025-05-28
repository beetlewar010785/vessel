import React, { useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, Routes, Link } from 'react-router-dom';

import { useAppContext } from '../../ioc/AppContext';
import { AuthStatus } from '../store/AuthStore';
import { NavItem } from '../navigation/NavItem';
import { createCrewNavItems } from '../navigation/crewNavItemsFactory';
import { createMgmtNavItems } from '../navigation/mgmtNavItemsFactory';
import { createRoutes } from '../navigation/route';

export default function LayoutPage() {
  const { authStore, logoutUseCase } = useAppContext();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = useCallback(() => {
    logoutUseCase.execute().catch(console.error);
  }, [logoutUseCase]);

  const renderLayout = (title: string, navItems: NavItem[]) => (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
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
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate('/');
              setDrawerOpen(false);
            }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.key}
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
              >
                {item.icon({ sx: { mr: 2 } })}
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>

          <Divider sx={{ my: 1 }} />

          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 2, color: 'error.main' }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box sx={{ padding: 2, pt: 3 }}>
        <Routes>{createRoutes(navItems)} </Routes>
      </Box>
    </Box>
  );

  const authState = authStore.authState.value;
  if (authState?.status !== AuthStatus.AUTHORIZED) return null;

  const isCrew = !!authState.profile.vessel;
  return isCrew
    ? renderLayout(`🚢 ${authState.profile.vessel}`, createCrewNavItems())
    : renderLayout('🧑‍💼 Management Portal', createMgmtNavItems());
}
