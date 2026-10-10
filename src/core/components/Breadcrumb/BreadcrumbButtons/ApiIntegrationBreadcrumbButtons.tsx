'use client';

import { useModalStore } from '@/core/store/useModalStore';
import { Plus } from 'lucide-react';

export function ApiIntegrationBreadcrumbButtons() {
  const { openModal } = useModalStore();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => openModal('CREATE_API_KEY')}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <Plus size={16} aria-hidden />
        Nova chave de API
      </button>
    </div>
  );
}
