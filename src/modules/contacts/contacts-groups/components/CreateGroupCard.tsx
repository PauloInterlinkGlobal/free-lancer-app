'use client';

import { Plus } from 'lucide-react';

interface CreateGroupCardProps {
  onClick: () => void;
}

export function CreateGroupCard({ onClick }: CreateGroupCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-44 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ui bg-transparent p-4 text-muted-content transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Plus size={20} aria-hidden />
      </span>
      <span className="text-sm font-medium">Criar grupo</span>
    </button>
  );
}
