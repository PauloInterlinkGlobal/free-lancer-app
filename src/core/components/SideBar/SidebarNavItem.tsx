'use client';

import { usePathname } from '@/core/i18n/navigation';
import { ChevronDown, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SidebarTooltip } from './SidebarTooltip';

interface SidebarSubItem {
  label: string;
  description?: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarNavItemProps {
  label: string;
  description?: string;
  href: string;
  icon: LucideIcon;
  collapsed: boolean;
  subItems?: SidebarSubItem[];
  iconBg?: string;
  iconColor?: string;
  matchPrefix?: string;
}

export function SidebarNavItem({
  label,
  description,
  href,
  icon: Icon,
  matchPrefix,
  collapsed,
  subItems,
  iconBg = 'bg-primary/10',
}: SidebarNavItemProps) {
  const pathname = usePathname();

  const items = subItems ?? [];
  const hasSubItems = items.length > 0;

  const matches = (target: string) =>
    pathname === target || pathname.startsWith(`${target}/`);

  const hasActiveSubItem = items.some((item) => matches(item.href));
  const isActive = matches(matchPrefix ?? href) || hasActiveSubItem;

  const [open, setOpen] = useState(isActive || hasActiveSubItem);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setHovered(false);
  }, [collapsed]);

  const handleToggle = () => {
    if (hasSubItems && !collapsed) {
      setOpen((prev) => !prev);
    }
  };

  const showSubItems = !collapsed && hasSubItems;

  return (
    <div
      onMouseEnter={() => collapsed && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SidebarTooltip label={label} description={description}>
        <div
          className={`flex items-center rounded-xl border transition-colors ${
            isActive
              ? 'border-border-ui bg-surface-raised'
              : 'border-transparent hover:bg-surface-raised'
          }`}
        >
          <Link
            href={href}
            className={`flex min-w-0 flex-1 items-center py-2 ${
              collapsed ? 'justify-center px-2' : 'gap-2.5 pl-2.5 pr-1'
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
            >
              <Icon
                className={`h-5 w-5 transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              />
            </div>

            {!collapsed && (
              <span
                className={`min-w-0 flex-1 truncate whitespace-nowrap text-sm ${
                  isActive
                    ? 'font-medium text-primary-content'
                    : 'text-secondary-content'
                }`}
              >
                {label}
              </span>
            )}
          </Link>

          {showSubItems && (
            <>
              <span
                aria-hidden
                className={`shrink-0 rounded-full bg-primary/10 px-1.5 text-[10px] font-semibold leading-4 text-primary transition-all duration-200 ${
                  open ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
                }`}
              >
                {items.length}
              </span>

              <button
                type="button"
                onClick={handleToggle}
                aria-expanded={open}
                aria-label={open ? `Recolher ${label}` : `Expandir ${label}`}
                className={`mx-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-surface-subtle ${
                  isActive ? 'text-primary' : 'text-muted-content'
                }`}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </>
          )}
        </div>
      </SidebarTooltip>

      {showSubItems && (
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="ml-[26px] mt-1 flex flex-col">
              {items.map((item, index) => {
                const SubIcon = item.icon;
                const isSubItemActive = pathname === item.href;
                const isLast = index === items.length - 1;

                return (
                  <div
                    key={item.href}
                    style={{
                      transitionDelay: open ? `${80 + index * 45}ms` : '0ms',
                    }}
                    className={`relative pl-6 transition-all duration-300 ${
                      open
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-1 opacity-0'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 h-1/2 w-4 rounded-bl-xl border-b border-l transition-colors ${
                        isSubItemActive ? 'border-primary' : 'border-border-ui'
                      }`}
                    />

                    {!isLast && (
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 top-1/2 border-l border-border-ui"
                      />
                    )}

                    <Link
                      href={item.href}
                      tabIndex={open ? 0 : -1}
                      className={`group my-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isSubItemActive
                          ? 'bg-primary/10 font-medium text-primary'
                          : 'text-secondary-content hover:bg-surface-raised hover:text-primary-content'
                      }`}
                    >
                      <SubIcon className="h-4 w-4 shrink-0" />
                      <span className="min-w-0 flex-1 truncate">
                        {item.label}
                      </span>

                      {isSubItemActive && (
                        <span
                          aria-hidden
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {collapsed && hasSubItems && hovered && (
        <div className="mt-1 flex flex-col items-center gap-1">
          {items.map((item) => {
            const SubIcon = item.icon;
            const isSubItemActive = pathname === item.href;

            return (
              <SidebarTooltip
                key={item.href}
                label={item.label}
                description={item.description}
              >
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                    isSubItemActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-secondary-content hover:bg-surface-raised hover:text-primary-content'
                  }`}
                >
                  <SubIcon className="h-4 w-4" />
                </Link>
              </SidebarTooltip>
            );
          })}
        </div>
      )}
    </div>
  );
}
