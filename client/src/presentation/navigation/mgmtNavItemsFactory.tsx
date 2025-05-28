import { NavItem, navItems } from './NavItem';
import { RoutePath } from './route';

export const createMgmtNavItems = (): NavItem[] => {
  return [navItems[RoutePath.HOME], navItems[RoutePath.PROFILE]];
};
