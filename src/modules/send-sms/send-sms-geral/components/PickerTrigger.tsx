'use client';

import { useModalStore, type ModalType } from '@/core/store/useModalStore';
import { List, type LucideIcon } from 'lucide-react';
import React from 'react';

interface PickerTriggerProps {
  /** Id do modal a abrir (PICK_GROUPS, PICK_TEMPLATES, PICK_LINKS). */
  id: ModalType;
  count?: number;
  label?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export function PickerTrigger({
  id,
  count = 0,
  label = 'Ver todos',
  icon: Icon = List,
  onClick,
  className = '',
}: PickerTriggerProps) {
  const { openModal } = useModalStore();

  const handleClick = () => {
    openModal(id);
    onClick?.();
  };

  // O nome acessível inclui a contagem, porque o número visível não é lido com o rótulo.
  const accessibleName =
    count > 0 ? `${label} (${count} selecionado${count === 1 ? '' : 's'})` : label;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-haspopup="dialog"
      aria-label={accessibleName}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-border-ui bg-surface px-2.5 py-1 text-xs font-medium text-primary-content shadow-sm transition-all hover:border-primary/40 hover:bg-item-hover active:scale-[0.98] ${className}`}
    >
      <Icon size={13} className="text-muted-content" aria-hidden />
      <span>{label}</span>
      {count > 0 && (
        <span
          aria-hidden
          className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/10 px-1 text-[10px] font-bold text-primary"
        >
          {count}
        </span>
      )}
    </button>
  );
}

export default PickerTrigger;
