'use client';

import { MoreVertical, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

export interface RowAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  danger?: boolean;
}

interface TableRowMenuProps {
  actions: RowAction[];
  label?: string;
}

const MENU_WIDTH = 176;
const ITEM_HEIGHT = 40;
const GAP = 4;

export function TableRowMenu({ actions, label = 'Acções' }: TableRowMenuProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const close = () => setPos(null);

  const toggle = (e: MouseEvent) => {
    e.stopPropagation();
    if (pos) return close();
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const menuHeight = actions.length * ITEM_HEIGHT + 8;
    const openUp = window.innerHeight - rect.bottom < menuHeight + GAP * 2;

    setPos({
      top: openUp ? rect.top - menuHeight - GAP : rect.bottom + GAP,
      left: Math.max(8, rect.right - MENU_WIDTH),
    });
  };

  useEffect(() => {
    if (!pos) return;

    const onMouseDown = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [pos]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={Boolean(pos)}
        onClick={toggle}
        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content ${
          pos ? 'bg-item-hover text-primary-content' : ''
        }`}
      >
        <MoreVertical size={16} aria-hidden />
      </button>

      {pos &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{ top: pos.top, left: pos.left, width: MENU_WIDTH }}
            className="fixed z-50 rounded-lg border border-ui bg-surface p-1 shadow-lg"
          >
            {actions.map(({ label, icon: Icon, onClick, danger }) => (
              <button
                key={label}
                type="button"
                role="menuitem"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                  onClick();
                }}
                className={`flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm transition-colors hover:bg-item-hover ${
                  danger ? 'text-red-500' : 'text-primary-content'
                }`}
              >
                <Icon size={16} className="shrink-0" aria-hidden />
                {label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
