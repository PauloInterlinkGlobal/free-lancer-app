'use client';

import { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';
import { Eye, MoreVertical, Pencil, Trash2, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface GroupCardProps {
  group: IGroup;
  onEdit: (group: IGroup) => void;
  onDelete: (group: IGroup) => void;
}

export function GroupCard({ group, onEdit, onDelete }: GroupCardProps) {
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

  const run = (action: string) => {
    setOpen(false);
    console.log(action, group.id);
  };

  const menuItem =
    'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-item-hover';

  return (
    <div className="flex min-h-36 flex-col justify-between gap-3 rounded-xl bg-surface p-8 shadow-sm">
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            title={group.name}
            className="truncate text-base font-semibold text-primary-content"
          >
            {group.name}
          </h3>

          <div ref={menuRef} className="relative shrink-0">
            <button
              type="button"
              aria-label="Abrir menu do grupo"
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-lg p-1 text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
            >
              <MoreVertical size={18} aria-hidden />
            </button>

            {open && (
              <div
                role="menu"
                className="absolute right-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-lg bg-surface shadow-lg ring-1 ring-black/5"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => run('Ver detalhes')}
                  className={`${menuItem} text-primary-content`}
                >
                  <Eye size={16} aria-hidden />
                  Ver detalhes
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    onEdit(group);
                  }}
                  className={`${menuItem} text-primary-content`}
                >
                  <Pencil size={16} aria-hidden />
                  Editar
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    onDelete(group);
                  }}
                  className={`${menuItem} text-red-500`}
                >
                  <Trash2 size={16} aria-hidden />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>

        <p
          title={group.description}
          className="line-clamp-2 text-sm text-muted-content"
        >
          {group.description}
        </p>
      </div>

      <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
        <Users size={12} aria-hidden />
        {group.contactsCount.toLocaleString()}{' '}
        {group.contactsCount === 1 ? 'contacto' : 'contactos'}
      </span>
    </div>
  );
}
