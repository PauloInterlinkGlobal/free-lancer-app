'use client';

import { Link } from '@/core/i18n/navigation';
import { usePathBreadcrumb } from '@/core/hooks/use-path-breadcrumb';
import { ChevronRight } from 'lucide-react';

export function HeaderBreadcrumb() {
  const { items } = usePathBreadcrumb();

  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="hidden min-w-0 lg:block">
      <ol className="flex items-center gap-1 text-sm">
        {items.map((item, index) => (
          <li key={item.label} className="flex min-w-0 items-center gap-1">
            {index > 0 && (
              <ChevronRight
                size={14}
                aria-hidden
                className="shrink-0 text-muted-content/60"
              />
            )}

            {item.href ? (
              <Link
                href={item.href}
                className="truncate rounded-lg mr-auto px-2 py-1 text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="truncate rounded-lg bg-surface-raised px-2 py-1 font-medium text-primary-content"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
