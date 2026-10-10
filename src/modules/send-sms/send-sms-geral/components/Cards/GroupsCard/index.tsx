'use client';

import { X, UsersRound } from 'lucide-react';
import { useMemo } from 'react';
import type { IContactGroup } from '../../../interfaces';
import { ItemPickerModal } from '../../Modal/ItemPickerModal';
import { PickerTrigger } from '../../PickerTrigger';

interface GroupsCardProps {
  groups: IContactGroup[];
  selectedIds: string[];
  /** Recebe a seleção final ao confirmar no modal (ou ao remover um chip). */
  onChange: (ids: string[]) => void;
}

const MAX_VISIBLE_CHIPS = 4;

export function GroupsCard({ groups, selectedIds, onChange }: GroupsCardProps) {
  // Só conta IDs que existem na lista atual (um grupo removido não fica "fantasma")
  const selectedGroups = useMemo(
    () => groups.filter((group) => selectedIds.includes(group.id)),
    [groups, selectedIds]
  );

  const pickerItems = useMemo(
    () =>
      groups.map((group) => ({
        id: group.id,
        title: group.name,
        subtitle: `${group.total} contacto${group.total === 1 ? '' : 's'}`,
      })),
    [groups]
  );

  const visibleChips = selectedGroups.slice(0, MAX_VISIBLE_CHIPS);
  const hiddenCount = selectedGroups.length - visibleChips.length;

  const removeGroup = (id: string) => {
    onChange(selectedIds.filter((groupId) => groupId !== id));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-primary-content">
          Grupos de contactos
        </span>

        <PickerTrigger
          id="PICK_GROUPS"
          count={selectedGroups.length}
          label="Escolher grupos"
          icon={UsersRound}
        />
      </div>

      {groups.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border-ui px-4 py-5 text-center text-sm text-muted-content">
          Nenhum grupo disponível.
        </p>
      ) : selectedGroups.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border-ui px-4 py-4 text-center text-xs text-muted-content">
          Nenhum grupo selecionado. Use &quot;Escolher grupos&quot; para
          adicionar.
        </p>
      ) : (
        <ul
          aria-label="Grupos selecionados"
          className="flex flex-wrap items-center gap-1.5"
        >
          {visibleChips.map((group) => (
            <li
              key={group.id}
              className="flex max-w-full items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 py-1 pl-2.5 pr-1 text-xs font-medium text-primary"
            >
              <span className="truncate">{group.name}</span>
              <span className="text-[11px] font-normal text-muted-content">
                {group.total}
              </span>
              <button
                type="button"
                onClick={() => removeGroup(group.id)}
                aria-label={`Remover grupo ${group.name}`}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/20"
              >
                <X size={12} aria-hidden />
              </button>
            </li>
          ))}

          {hiddenCount > 0 && (
            <li className="rounded-full bg-surface-raised px-2.5 py-1 text-xs font-medium text-muted-content">
              +{hiddenCount}
            </li>
          )}
        </ul>
      )}

      <ItemPickerModal
        id="PICK_GROUPS"
        title="Grupos de contactos"
        description="Selecione um ou mais grupos para o envio."
        icon={UsersRound}
        items={pickerItems}
        selectedIds={selectedIds}
        mode="multiple"
        pageSize={6}
        emptyMessage="Nenhum grupo disponível."
        confirmLabel="Aplicar"
        onConfirm={onChange}
      />
    </div>
  );
}

export default GroupsCard;
