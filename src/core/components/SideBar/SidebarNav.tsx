import { navItems } from './nav-items';
import { SidebarNavItem } from './SidebarNavItem';

export function SidebarNav({ collapsed }: { collapsed: boolean }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
      {navItems.map((item) => (
        <SidebarNavItem key={item.href} {...item} collapsed={collapsed} />
      ))}
    </nav>
  );
}

export default SidebarNav;
