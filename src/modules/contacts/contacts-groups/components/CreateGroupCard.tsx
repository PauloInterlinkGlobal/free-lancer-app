import { Plus } from 'lucide-react';

interface CreateGroupCardProps {
  onClick: () => void;
}

export function CreateGroupCard({ onClick }: CreateGroupCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-48 w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-ui p-5 text-primary-content transition-colors hover:border-primary hover:bg-primary/5"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Plus size={22} aria-hidden />
      </span>
      <span className="text-sm font-semibold">Criar grupo</span>
      <span className="text-xs text-muted-content">
        Organize novos contactos
      </span>
    </button>
  );
}
