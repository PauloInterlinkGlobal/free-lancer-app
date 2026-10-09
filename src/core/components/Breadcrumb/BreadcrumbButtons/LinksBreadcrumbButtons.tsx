'use client';

import { useModalStore } from '@/core/store/useModalStore';
import { Plus } from 'lucide-react';

interface LinksBreadcrumbButtonsProps {
  onAdd?: () => void;
}

export function LinksBreadcrumbButtons({
  onAdd,
}: LinksBreadcrumbButtonsProps) {
  const { openModal } = useModalStore();

  const handleAdd = onAdd ?? (() => openModal('ADD_LINK'));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <Plus size={16} aria-hidden />
        Adicionar link
      </button>
    </div>
  );
}
