'use client';

import { Copy, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ITemplate } from '../../../interfaces/templates';

interface TemplateCardMenuProps {
  template: ITemplate;
  onEdit?: (template: ITemplate) => void;
  onDelete?: (template: ITemplate) => void;
  onUseAsBase?: (template: ITemplate) => void;
}

export function TemplateCardMenu({
  template,
  onEdit,
  onDelete,
  onUseAsBase,
}: TemplateCardMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Opções do modelo"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-surface-raised hover:text-primary-content"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-xl border border-border-ui bg-surface p-1 shadow-xl">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onEdit?.(template);
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-secondary-content transition-colors hover:bg-surface-raised hover:text-primary-content"
          >
            <Pencil size={14} />
            Editar
          </button>
          {onUseAsBase && (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onUseAsBase(template);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-secondary-content transition-colors hover:bg-surface-raised hover:text-primary-content"
            >
              <Copy size={14} />
              Usar como base
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDelete?.(template);
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-rose-600 transition-colors hover:bg-rose-500/10"
          >
            <Trash2 size={14} />
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}
