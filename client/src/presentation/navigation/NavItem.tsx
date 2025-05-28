import { SvgIconProps } from '@mui/material';
import { JSX } from 'react';
import { RoutePath } from './route';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListIcon from '@mui/icons-material/List';

export interface NavItem {
  key: string;
  label: string;
  path: RoutePath;
  showInDashboard: boolean;
  icon: (props: SvgIconProps) => JSX.Element;
}

export const navItems: Record<RoutePath, NavItem> = {
  [RoutePath.HOME]: {
    key: 'home',
    label: 'Home',
    path: RoutePath.HOME,
    icon: (props: SvgIconProps) => <HomeIcon {...props} />,
    showInDashboard: false,
  },
  [RoutePath.REQUESTS]: {
    key: 'requests',
    label: 'Requests',
    path: RoutePath.REQUESTS,
    icon: (props: SvgIconProps) => <ListIcon {...props} />,
    showInDashboard: true,
  },
  [RoutePath.PROFILE]: {
    key: 'profile',
    label: 'Profile',
    path: RoutePath.PROFILE,
    icon: (props: SvgIconProps) => <AccountCircleIcon {...props} />,
    showInDashboard: true,
  },
} as const;
