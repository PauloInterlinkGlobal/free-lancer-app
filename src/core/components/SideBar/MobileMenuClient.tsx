'use client';

import { navItems } from '@/core/components/SideBar/nav-items';
import { Link, useRouter } from '@/core/i18n/navigation';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export function MobileMenuClient() {
  const router = useRouter();

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const check = () => {
      if (mq.matches) router.replace('/dashboard');
    };
    check();
    mq.addEventListener('change', check);
    return () => mq.removeEventListener('change', check);
  }, [router]);

  return (
    <div className="flex flex-col gap-5 lg:hidden">
      <h1 className="text-2xl font-bold text-primary-content">Menu</h1>

      <ul className="flex flex-col gap-3">
        {navItems.map(
          ({
            label,
            description,
            href,
            icon: Icon,
            iconBg,
            iconColor,
            subItems,
          }) => (
            <li
              key={href}
              className="overflow-hidden rounded-2xl border border-border-ui bg-surface"
            >
              <Link
                href={href}
                className="flex items-center gap-4 px-4 py-4 transition-colors active:bg-surface-raised"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${iconColor}`} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-medium text-primary-content">
                    {label}
                  </span>
                  {description && (
                    <span className="line-clamp-1 block text-sm text-muted-content">
                      {description}
                    </span>
                  )}
                </span>

                <ChevronRight className="h-4 w-4 shrink-0 text-muted-content" />
              </Link>

              {subItems?.map(
                ({ label: l, description: d, href: h, icon: SubIcon }) => (
                  <Link
                    key={h}
                    href={h}
                    className="flex items-center gap-4 border-t border-border-ui px-4 py-3.5 transition-colors active:bg-surface-raised"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-raised">
                      <SubIcon className="h-5 w-5 text-secondary-content" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] text-primary-content">
                        {l}
                      </span>
                      {d && (
                        <span className="line-clamp-1 block text-sm text-muted-content">
                          {d}
                        </span>
                      )}
                    </span>

                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-content" />
                  </Link>
                )
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
