'use client';

import { useSidebarStore } from '@/core/store/sidebar.store';
import { Menu } from 'lucide-react';

export function HeaderMenuButton() {
  const { toggleSidebar, isOpen } = useSidebarStore();

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      aria-label={
        isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
      }
      aria-expanded={isOpen}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content lg:hidden"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
