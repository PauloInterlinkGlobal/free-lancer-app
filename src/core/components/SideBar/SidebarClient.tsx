'use client';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useState } from 'react';
import { SidebarLogo } from './SidebarLogo';
import { SidebarMobile } from './SidebarMobile';
import { SidebarNav } from './SidebarNav';

const HEADER_HEIGHT = 80;
const CARD_OFFSET = 12 + 1;

export function SidebarClient() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <SidebarMobile />
      <aside
        className={`sticky top-3 m-3 hidden h-[calc(100vh-1.5rem)] shrink-0 flex-col rounded-2xl border border-border-ui bg-surface px-3 pb-4 shadow-sm transition-[width] duration-200 lg:flex ${
          collapsed ? 'w-[72px]' : 'w-[240px]'
        }`}
      >
        <div
          style={{ height: HEADER_HEIGHT - CARD_OFFSET }}
          className={`mb-3 flex shrink-0 items-center border-b border-dashed border-border-ui ${
            collapsed ? 'justify-center' : 'justify-between pl-1'
          }`}
        >
          {!collapsed && <SidebarLogo />}

          <button
            type="button"
            onClick={() => setCollapsed((p) => !p)}
            aria-label={collapsed ? 'Abrir sidebar' : 'Fechar sidebar'}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-surface-raised hover:text-primary-content"
          >
            {collapsed ? (
              <PanelLeftOpen size={22} />
            ) : (
              <PanelLeftClose size={22} />
            )}
          </button>
        </div>

        <SidebarNav collapsed={collapsed} />
      </aside>
    </>
  );
}
