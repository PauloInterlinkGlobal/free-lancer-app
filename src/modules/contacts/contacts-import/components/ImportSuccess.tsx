'use client';

import { Link } from '@/core/i18n/navigation';
import { CheckCircle2 } from 'lucide-react';

interface ImportSuccessProps {
  onReset: () => void;
}

export function ImportSuccess({ onReset }: ImportSuccessProps) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 rounded-2xl bg-surface p-6 text-center shadow-sm md:p-8">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">
        <CheckCircle2 size={36} aria-hidden />
      </span>

      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-primary-content md:text-2xl">
          Importação concluída
        </h2>
        <p className="text-sm text-muted-content">
          Os seus contactos foram adicionados com sucesso.
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/contacts"
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Ver contactos
        </Link>

        <button
          type="button"
          onClick={onReset}
          className="rounded-xl px-5 py-3 text-sm font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
        >
          Importar outro ficheiro
        </button>
      </div>
    </div>
  );
}
