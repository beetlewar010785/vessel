import { RoutePath } from './route';
import { NavItem, navItems } from './NavItem';

export const createCrewNavItems = (): NavItem[] => {
  return [navItems[RoutePath.HOME], navItems[RoutePath.REQUESTS], navItems[RoutePath.PROFILE]];
};
