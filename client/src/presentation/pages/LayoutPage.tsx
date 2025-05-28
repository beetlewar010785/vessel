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
import { useNavigate, Routes, Link, Route } from 'react-router-dom';

import { useAppContext } from '../../ioc/AppContext';
import { AuthStatus } from '../store/AuthStore';
import { getRoutes, RouteItem } from '../route';
import { UserProfile } from '../../domain/auth';
import BreadcrumbsComponent from '../components/BreadcrumbsComponent';

export default function LayoutPage() {
    const { authStore, logoutUseCase } = useAppContext();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = useCallback(() => {
        logoutUseCase.execute().catch(console.error);
    }, [logoutUseCase]);

    const renderLayout = (title: string, routes: RouteItem[]) => (
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
                        {routes.map((route) => (
                            <ListItemButton
                                key={route.path}
                                component={Link}
                                to={route.path}
                                onClick={() => setDrawerOpen(false)}
                            >
                                {route.icon({ sx: { mr: 2 } })}
                                <ListItemText primary={route.label} />
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
                <BreadcrumbsComponent routes={routes} /> {/* 👈 ВСТАВЛЯЕМ ЗДЕСЬ */}
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </Box>
        </Box>
    );

    const render = (profile: UserProfile) => {
        const title = profile.vessel ? `🚢 ${profile.vessel}` : '🧑‍💼 Management Portal';
        const routes = getRoutes(profile.role);
        return <>{renderLayout(title, routes)}</>;
    };

    return (
        <>
            {authStore.authState.value?.status === AuthStatus.AUTHORIZED &&
                render(authStore.authState.value.profile)}
        </>
    );
}
