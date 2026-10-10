'use client';

import { Check, UsersRound, X } from 'lucide-react';
import type { IContactGroup } from '../../../interfaces';
import { PickerTrigger } from '../../PickerTrigger';

interface GroupsCardProps {
  groups: IContactGroup[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function GroupsCard({ groups, selectedIds, onChange }: GroupsCardProps) {
  const selected = groups.filter((g) => selectedIds.includes(g.id));

  const remove = (id: string) => {
    onChange(selectedIds.filter((item) => item !== id));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary-content">
            Grupos de contactos
          </span>
          {selectedIds.length > 0 && (
            <span className="text-xs font-medium text-primary">
              ({selectedIds.length} selecionado
              {selectedIds.length === 1 ? '' : 's'})
            </span>
          )}
        </div>

        <PickerTrigger id="PICK_GROUPS" count={selectedIds.length} />
      </div>

      {selected.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border-ui bg-surface/50 px-4 py-5 text-center">
          <p className="text-sm text-muted-content">
            Nenhum grupo seleccionado.
          </p>
          <p className="text-xs text-muted-content">
            Clique em «Ver todos» para escolher grupos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {selected.map((group) => (
            <div
              key={group.id}
              className="flex items-center gap-3 rounded-xl border border-primary bg-primary/10 p-3 shadow-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Check size={16} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-primary-content">
                  {group.name}
                </span>
                <span className="block text-xs text-muted-content">
                  {group.total} contactos
                </span>
              </div>
              <button
                type="button"
                onClick={() => remove(group.id)}
                aria-label={`Remover ${group.name}`}
                className="rounded-lg p-1 text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
              >
                <X size={16} aria-hidden />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GroupsCard;
