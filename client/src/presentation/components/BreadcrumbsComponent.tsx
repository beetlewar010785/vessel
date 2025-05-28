import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { useLocation, Link as RouterLink, matchPath } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { RouteItem } from '../route';

export interface BreadcrumbsComponentProps {
    routes: RouteItem[];
}

export default function BreadcrumbsComponent({ routes }: BreadcrumbsComponentProps) {
    const location = useLocation();
    const pathNames = location.pathname.split('/').filter(Boolean);

    const buildPath = (index: number) => '/' + pathNames.slice(0, index + 1).join('/');

    const crumbs = pathNames.map((_, index) => {
        const fullPath = buildPath(index);
        const route = routes.find((r) => matchPath(r.path, fullPath));

        if (!route) return null;

        const isLast = index === pathNames.length - 1;

        return isLast ? (
            <Typography
                key={fullPath}
                color="text.primary"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                {route.label}
            </Typography>
        ) : (
            <Link
                key={fullPath}
                component={RouterLink}
                underline="hover"
                color="inherit"
                to={route.path}
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                {route.label}
            </Link>
        );
    });

    return (
        <Box sx={{ mb: 2, px: 2 }}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link
                    component={RouterLink}
                    underline="hover"
                    color="inherit"
                    to="/"
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    {routes.find((r) => r.path === '/')?.label || ''}
                </Link>
                {crumbs}
            </Breadcrumbs>
        </Box>
    );
}
