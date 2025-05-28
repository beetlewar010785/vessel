import React, { JSX } from 'react';
import ProfilePage from './pages/auth/ProfilePage';
import CrewRequestsPage from './pages/crew/CrewRequestsPage';
import { AllRoles, AllCrewRoles, Role } from '../domain/auth';
import { SvgIconProps } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';
import Add from '@mui/icons-material/Add';
import DashboardPage from './pages/DashboardPage';
import CrewCreateRequestPage from './pages/crew/CrewCreateRequestPage';

export enum RoutePath {
    HOME = '/',
    PROFILE = '/profile',
    REQUESTS = '/requests',
    CREATE_REQUEST = '/requests/create',
}

export interface RouteItem {
    path: RoutePath;
    label: string;
    element: JSX.Element;
    roles: Role[];
    order: number;
    showInDashboard: boolean;
    icon: (props: SvgIconProps) => JSX.Element;
}

const routes: RouteItem[] = [
    {
        path: RoutePath.HOME,
        label: 'Home',
        element: <DashboardPage />,
        roles: AllRoles,
        order: 0,
        showInDashboard: false,
        icon: (props: SvgIconProps) => <HomeIcon {...props} />,
    },
    {
        path: RoutePath.PROFILE,
        label: 'Profile',
        element: <ProfilePage />,
        roles: AllRoles,
        order: 1000,
        showInDashboard: true,
        icon: (props: SvgIconProps) => <AccountCircleIcon {...props} />,
    },
    {
        path: RoutePath.REQUESTS,
        label: 'Requests',
        element: <CrewRequestsPage />,
        roles: AllCrewRoles,
        order: 1,
        showInDashboard: true,
        icon: (props: SvgIconProps) => <ListIcon {...props} />,
    },
    {
        path: RoutePath.CREATE_REQUEST,
        label: 'Create Request',
        element: <CrewCreateRequestPage />,
        roles: AllCrewRoles,
        order: 2,
        showInDashboard: true,
        icon: (props: SvgIconProps) => <Add {...props} />,
    },
];

export function getRoutes(role: Role): RouteItem[] {
    return routes.filter((r) => r.roles.includes(role)).sort((a, b) => a.order - b.order);
}

export function getIcon(path: RoutePath): (props: SvgIconProps) => JSX.Element {
    const route = routes.find((r) => r.path === path);
    return route ? route.icon : () => <></>;
}
