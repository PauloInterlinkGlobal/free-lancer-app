'use client';

import { usePathname } from '@/core/i18n/navigation';
import { useSidebarStore } from '@/core/store/sidebar.store';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { SidebarLogo } from './SidebarLogo';
import { SidebarNav } from './SidebarNav';

export function SidebarMobile() {
  const { isOpen, closeSidebar } = useSidebarStore();
  const pathname = usePathname();

  // Fecha a sidebar ao mudar de rota
  useEffect(() => {
    closeSidebar();
  }, [pathname, closeSidebar]);

  // Fecha no Escape e previne scroll da tela quando aberto
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeSidebar();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeSidebar]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop com blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* Painel lateral drawer */}
      <aside
        aria-label="Navegação Mobile"
        className="fixed inset-y-0 left-0 z-50 flex h-full w-[280px] max-w-[85vw] flex-col border-r border-border-ui bg-surface px-4 py-4 shadow-2xl transition-transform duration-300 animate-in slide-in-from-left duration-200"
      >
        <div className="mb-4 flex h-14 shrink-0 items-center justify-between border-b border-dashed border-border-ui px-1 pb-3">
          <SidebarLogo />
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Fechar menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-surface-raised hover:text-primary-content"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <SidebarNav collapsed={false} />
        </div>
      </aside>
    </div>
  );
}
