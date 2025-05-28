import { NavItem } from './NavItem';
import React, { JSX } from 'react';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/auth/ProfilePage';
import CrewRequestsPage from '../pages/crew/CrewRequestsPage';
import { Route } from 'react-router-dom';

export enum RoutePath {
  HOME = '/',
  PROFILE = '/profile',
  REQUESTS = '/requests',
}

const routeComponentMap: Record<string, (items: NavItem[]) => JSX.Element> = {
  [RoutePath.HOME]: (items) => (
    <DashboardPage
      items={items
        .filter((i) => i.showInDashboard)
        .map(({ path, label, icon }) => ({ path, label, icon }))}
    />
  ),
  [RoutePath.PROFILE]: () => <ProfilePage />,
  [RoutePath.REQUESTS]: () => <CrewRequestsPage />,
};

export const createRoutes = (navItems: NavItem[]) =>
  navItems.map((item) => {
    const componentFactory = routeComponentMap[item.path];
    if (!componentFactory) {
      throw new Error(`No route defined for path: ${item.path}`);
    }
    return <Route key={item.key} path={item.path} element={componentFactory(navItems)} />;
  });
