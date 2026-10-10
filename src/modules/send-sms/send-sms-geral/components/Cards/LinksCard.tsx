'use client';

import { Link } from '@/core/i18n/navigation';
import type { ApprovedLink } from '@/modules/links/services/links.service';
import { Link2, X } from 'lucide-react';
import { PickerTrigger } from '../PickerTrigger';

interface LinksCardProps {
  links: ApprovedLink[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  onInsertLink: (url: string) => void;
}

export function LinksCard({
  links,
  selectedIds,
  onChange,
  onInsertLink,
}: LinksCardProps) {
  const selected = links.filter((l) => selectedIds.includes(l.id));

  const remove = (id: string) => {
    onChange(selectedIds.filter((item) => item !== id));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-primary-content">
          Inserir links na mensagem
        </span>

        <div className="flex items-center gap-2">
          <PickerTrigger id="PICK_LINKS" count={selectedIds.length} />
          <Link
            href="/links"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:underline"
          >
            <Link2 size={13} aria-hidden />
            Gerir links
          </Link>
        </div>
      </div>

      {selected.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-ui bg-surface/50 p-6 text-center">
          <p className="text-xs text-muted-content">
            Nenhum link seleccionado para inserção.
          </p>
          <p className="text-xs text-muted-content">
            Clique em «Ver todos» para escolher links aprovados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((link) => (
            <div
              key={link.id}
              className="group flex items-center gap-2 rounded-xl border border-border-ui bg-surface p-2.5 transition-colors hover:border-primary/40"
            >
              <button
                type="button"
                onClick={() => onInsertLink(link.url)}
                title={`Inserir "${link.description}" na mensagem`}
                className="flex min-w-0 flex-1 items-center gap-2 text-left"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Link2 size={15} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-primary-content">
                    {link.description}
                  </span>
                  <span className="block truncate font-mono text-[11px] text-muted-content">
                    {link.url}
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => remove(link.id)}
                aria-label={`Remover ${link.description}`}
                className="rounded-lg p-1 text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
              >
                <X size={14} aria-hidden />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LinksCard;
