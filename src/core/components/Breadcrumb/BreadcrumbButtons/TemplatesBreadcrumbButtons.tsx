'use client';

import { Plus } from 'lucide-react';

interface TemplatesBreadcrumbButtonsProps {
  onAdd?: () => void;
}

export function TemplatesBreadcrumbButtons({
  onAdd,
}: TemplatesBreadcrumbButtonsProps) {
  const handleAdd =
    onAdd ??
    (() => {
      document
        .getElementById('template-composer')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('template-composer-title')?.focus();
    });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleAdd}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <Plus size={16} aria-hidden />
        Novo Modelo
      </button>
    </div>
  );
}
