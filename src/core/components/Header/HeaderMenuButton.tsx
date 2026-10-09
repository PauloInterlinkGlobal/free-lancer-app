'use client';

import { useRouter } from '@/core/i18n/navigation';
import { Menu } from 'lucide-react';

export function HeaderMenuButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push('/menu')}
      aria-label="Abrir menu"
      className="-ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary-content transition-colors hover:bg-surface-raised active:bg-surface-subtle lg:hidden"
    >
      <Menu size={22} aria-hidden />
    </button>
  );
}
