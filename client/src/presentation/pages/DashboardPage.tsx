import { Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getRoutes, RouteItem } from '../route';
import { useAppContext } from '../../ioc/AppContext';
import { AuthStatus } from '../store/AuthStore';

export default function DashboardPage() {
    const navigate = useNavigate();
    const { authStore } = useAppContext();

    const renderCard = (route: RouteItem) => (
        <Card key={route.path}>
            <CardActionArea onClick={() => navigate(route.path)}>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        py: 4,
                    }}
                >
                    {route.icon({ sx: { fontSize: 40, mb: 1 } })}
                    <Typography variant="h6">{route.label}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

    const renderCards = (routes: RouteItem[]) => {
        return routes.map((route) => (
            <Grid key={route.path} size={6}>
                {renderCard(route)}
            </Grid>
        ));
    };

    return (
        <Grid container spacing={2}>
            {authStore.authState.value?.status === AuthStatus.AUTHORIZED &&
                renderCards(
                    getRoutes(authStore.authState.value.profile.role).filter(
                        (route) => route.showInDashboard,
                    ),
                )}
        </Grid>
    );
}
