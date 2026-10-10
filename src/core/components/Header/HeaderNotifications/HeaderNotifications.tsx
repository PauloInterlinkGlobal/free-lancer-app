'use client';

import {
  recentNotificationsMock,
  type HeaderNotification,
} from '@/core/components/Header/header-data';
import { useClickOutside } from '@/core/components/Header/useClickOutside';
import { Link } from '@/core/i18n/navigation';
import { Bell } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function HeaderNotifications() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const notifications: HeaderNotification[] = recentNotificationsMock.slice(
    0,
    5
  );

  useClickOutside(ref, close, open);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Notificações"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o);
          setUnread(false);
        }}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-item-hover"
      >
        <Bell className="h-5 w-5 text-text-secondary" />
        {unread && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-secondary-400" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-border-ui bg-surface shadow-md">
          <div className="border-b border-border-ui px-4 py-3 text-sm font-semibold">
            Notificações
          </div>
          <ul className="max-h-96 overflow-y-auto p-1.5">
            {notifications.map((n) => (
              <li key={n.id}>
                <Link
                  href={n.href}
                  onClick={close}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-item-hover"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{n.title}</span>
                    <span className="shrink-0 text-xs text-text-secondary">
                      {formatDate(n.date)}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-text-secondary">
                    {n.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
