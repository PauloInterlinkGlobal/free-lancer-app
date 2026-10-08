import { ChevronDown } from 'lucide-react';

interface AccountChipProps {
  email: string;
  onClick: () => void;
}

export default function AccountChip({ email, onClick }: AccountChipProps) {
  const initial = email.trim().charAt(0).toUpperCase();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Alterar conta de e-mail"
      className="group mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-primary bg-secundary-100 dark:bg-neutral-800/80 px-3.5 py-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-200 transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
    >
      <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-primary text-[10px] font-bold text-white">
        {initial}
      </div>
      <span className="max-w-[200px] truncate">{email.trim()}</span>
      <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 dark:text-neutral-400 transition group-hover:translate-y-0.5 group-hover:text-neutral-700 dark:group-hover:text-neutral-200" />
    </button>
  );
}
