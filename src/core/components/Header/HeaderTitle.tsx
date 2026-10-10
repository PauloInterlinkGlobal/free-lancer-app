'use client';

import { usePathname } from '@/core/i18n/navigation';

const routeLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/users': 'Utilizadores',
  '/reports': 'Relatórios',
  '/settings': 'Configurações',
};

export function HeaderTitle() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const route = '/' + segments[segments.length - 1];
  const label = routeLabels[route] ?? 'Dashboard';

  return (
    <h1 className="text-[18px] font-semibold tracking-[-0.01em] text-text-primary">
      {label}
    </h1>
  );
}
