import { useRouter } from '@/core/i18n/navigation';
import {
  DEFAULT_TONE,
  type GroupTone,
  formatShare,
  getInitials,
} from '@/modules/contacts/contacts-groups/utils/group-visuals';
import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { IGroup } from '../interfaces/groups';

interface GroupCardProps {
  group: IGroup;
  tone?: GroupTone;
  share?: number;
  onEdit: (group: IGroup) => void;
  onDelete: (group: IGroup) => void;
}

export function GroupCard({
  group,
  tone = DEFAULT_TONE,
  share = 0,
  onEdit,
  onDelete,
}: GroupCardProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const menuItem =
    'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-item-hover';

  const count = group.contactsCount;

  return (
    <article className="flex min-h-48 flex-col gap-3 rounded-3xl bg-surface p-5 shadow-sm md:p-6">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${tone.bg} ${tone.text}`}
        >
          {getInitials(group.name)}
        </span>

        <h3
          title={group.name}
          className="min-w-0 flex-1 truncate text-base font-semibold text-primary-content"
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
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <MoreVertical size={18} aria-hidden />
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-xl bg-surface shadow-lg ring-1 ring-black/5"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  router.push(`/contacts/groups/${group.id}`);
                }}
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

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-3xl font-bold leading-none text-primary-content">
            {count.toLocaleString()}{' '}
            <span className="text-sm font-normal text-muted-content">
              {count === 1 ? 'contacto' : 'contactos'}
            </span>
          </p>
          <span className="text-xs font-semibold text-muted-content">
            {formatShare(share, count)}
          </span>
        </div>

        <div aria-hidden className="h-1.5 rounded-full bg-surface-raised">
          <div
            className={`h-1.5 rounded-full ${tone.bg}`}
            style={{ width: `${share}%`, minWidth: count > 0 ? 6 : 0 }}
          />
        </div>
      </div>
    </article>
  );
}
