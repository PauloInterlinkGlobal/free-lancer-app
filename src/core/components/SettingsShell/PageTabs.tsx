'use client';

import { Link, usePathname } from '@/core/i18n/navigation';

export interface PageTab {
  key: string;
  href: string;
  label: string;
  badge?: number;
}

export function PageTabs({ tabs }: { tabs: PageTab[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-ui">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={active ? 'page' : undefined}
            className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-content hover:bg-item-hover'
            }`}
          >
            {tab.label}
            {tab.badge ? (
              <span className="rounded-full border border-ui px-1.5 text-xs">
                {tab.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export default PageTabs;
