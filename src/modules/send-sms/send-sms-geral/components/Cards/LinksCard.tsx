'use client';

import { Link } from '@/core/i18n/navigation';
import { useToastStore } from '@/core/store';
import { ILink } from '@/modules/links/interfaces/links';
import { Check, Link2 } from 'lucide-react';
import { useMemo, useRef, useState, useEffect } from 'react';
import { ItemPickerModal } from '../Modal/ItemPickerModal';
import { PickerTrigger } from '../PickerTrigger';

interface LinksCardProps {
  links?: Pick<ILink, 'id' | 'description' | 'url'>[];
  /** Chamado uma vez por URL, pela ordem escolhida. */
  onInsertLink: (url: string) => void;
}

export function LinksCard({ links = [], onInsertLink }: LinksCardProps) {
  const { success } = useToastStore();
  const [lastInsertedId, setLastInsertedId] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpa o temporizador do destaque "Inserido" ao desmontar
  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const pickerItems = useMemo(
    () =>
      links.map((link) => ({
        id: link.id,
        title: link.description,
        subtitle: link.url,
      })),
    [links]
  );

  const handleSelectLink = (link: Pick<ILink, 'id' | 'description' | 'url'>) => {
    onInsertLink(link.url);
    setLastInsertedId(link.id);
    success(`Link "${link.description}" inserido na mensagem!`);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setLastInsertedId(null);
    }, 1800);
  };

  // Insere todos os links escolhidos no modal, pela ordem da lista
  const handlePickerConfirm = (ids: string[]) => {
    const chosen = links.filter((link) => ids.includes(link.id));
    if (chosen.length === 0) return;

    chosen.forEach((link) => onInsertLink(link.url));
    success(
      chosen.length === 1
        ? `Link "${chosen[0].description}" inserido na mensagem!`
        : `${chosen.length} links inseridos na mensagem!`
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-primary-content">
          Inserir links na mensagem
        </span>

        <div className="flex items-center gap-2">
          {links.length > 0 && (
            <PickerTrigger
              id="PICK_LINKS"
              label="Ver todos"
              icon={Link2}
            />
          )}

          <Link
            href="/links"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:underline"
          >
            <Link2 size={13} aria-hidden />
            Gerir links
          </Link>
        </div>
      </div>

      {links.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-ui bg-surface/50 p-6 text-center">
          <p className="text-xs text-muted-content">
            Não tem nenhum link aprovado para inserção.
          </p>
          <Link
            href="/links"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <Link2 size={13} aria-hidden />
            Gerir links
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => {
            const isRecentlyInserted = lastInsertedId === link.id;

            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleSelectLink(link)}
                title={`Clique para inserir "${link.url}" na mensagem`}
                className={`group flex items-center justify-between gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                  isRecentlyInserted
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-sm'
                    : 'border-border-ui bg-surface hover:border-primary/50 hover:bg-item-hover'
                }`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isRecentlyInserted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-surface-raised text-primary group-hover:bg-primary group-hover:text-white'
                    }`}
                  >
                    {isRecentlyInserted ? (
                      <Check size={15} aria-hidden />
                    ) : (
                      <Link2 size={15} aria-hidden />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-primary-content">
                      {link.description}
                    </span>
                    <span className="block truncate text-[11px] font-mono text-muted-content">
                      {link.url}
                    </span>
                  </div>
                </div>

                <span
                  aria-hidden
                  className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
                    isRecentlyInserted
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-surface-raised text-muted-content group-hover:bg-primary/10 group-hover:text-primary'
                  }`}
                >
                  {isRecentlyInserted ? 'Inserido' : '+ Inserir'}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <ItemPickerModal
        id="PICK_LINKS"
        title="Inserir links na mensagem"
        description="Escolha um ou mais links aprovados. Serão adicionados ao fim da mensagem."
        icon={Link2}
        items={pickerItems}
        selectedIds={[]}
        mode="multiple"
        pageSize={6}
        emptyMessage="Não tem nenhum link aprovado para inserção."
        confirmLabel="Inserir"
        onConfirm={handlePickerConfirm}
      />
    </div>
  );
}

export default LinksCard;
