'use client';

import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import type { ISmsTemplate } from '../../../interfaces';
import { ItemPickerModal } from '../../Modal/ItemPickerModal';
import { PickerTrigger } from '../../PickerTrigger';

interface TemplatesCardProps {
  templates: ISmsTemplate[];
  /** Texto atual da mensagem. Se existir texto diferente, pede confirmação antes de substituir. */
  currentMessage: string;
  onSelect: (content: string) => void;
}

const PAGE_SIZE = 4; // 2 colunas x 2 linhas

export function TemplatesCard({
  templates,
  currentMessage,
  onSelect,
}: TemplatesCardProps) {
  const t = useTranslations('pagination');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pending, setPending] = useState<ISmsTemplate | null>(null);

  const totalPages = Math.max(1, Math.ceil(templates.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = templates.slice(start, start + PAGE_SIZE);

  const pickerItems = useMemo(
    () =>
      templates.map((tpl) => ({
        id: tpl.id,
        title: tpl.title,
        subtitle: tpl.content,
      })),
    [templates]
  );

  // Aplica o modelo de forma definitiva (sem confirmação)
  function applyTemplate(tpl: ISmsTemplate) {
    setSelectedId(tpl.id);
    setPending(null);
    onSelect(tpl.content);
  }

  // Pede confirmação só quando há texto que seria perdido
  function requestTemplate(tpl: ISmsTemplate) {
    const hasOtherText =
      currentMessage.trim() !== '' &&
      currentMessage.trim() !== tpl.content.trim();

    if (hasOtherText) {
      setPending(tpl);
      return;
    }
    applyTemplate(tpl);
  }

  // Confirmação vinda do modal "Ver todos" (modo single: pode vir vazio)
  function handlePickerConfirm(ids: string[]) {
    const tpl = templates.find((item) => item.id === ids[0]);
    if (tpl) requestTemplate(tpl);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-primary-content">
          Começar a partir de um modelo
        </span>

        {templates.length > 0 && (
          <PickerTrigger
            id="PICK_TEMPLATES"
            label="Ver todos"
            icon={FileText}
          />
        )}
      </div>

      {pending && (
        <div
          role="group"
          aria-labelledby="templates-confirm-title"
          aria-describedby="templates-confirm-desc"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setPending(null);
          }}
          className="flex flex-col gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3"
        >
          <p
            id="templates-confirm-title"
            className="text-sm font-semibold text-primary-content"
          >
            Substituir o texto atual?
          </p>
          <p
            id="templates-confirm-desc"
            className="text-xs leading-relaxed text-muted-content"
          >
            O texto da mensagem será trocado pelo modelo &quot;{pending.title}
            &quot;. O texto atual será perdido.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              autoFocus
              onClick={() => setPending(null)}
              className="inline-flex h-8 items-center rounded-lg border border-border-ui bg-surface px-3 text-xs font-medium text-primary-content transition-colors hover:bg-item-hover"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => applyTemplate(pending)}
              className="inline-flex h-8 items-center rounded-lg bg-primary px-3 text-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              Substituir texto
            </button>
          </div>
        </div>
      )}

      {templates.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border-ui px-4 py-5 text-center text-sm text-muted-content">
          Nenhum modelo criado.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {visible.map((tpl) => {
              const active = selectedId === tpl.id;
              return (
                <button
                  key={tpl.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => requestTemplate(tpl)}
                  className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                    active
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border-ui bg-surface hover:border-primary/40 hover:bg-item-hover'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      active
                        ? 'bg-primary text-white'
                        : 'bg-surface-raised text-muted-content'
                    }`}
                  >
                    <FileText size={16} aria-hidden />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-primary-content">
                      {tpl.title}
                    </span>
                    <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-muted-content">
                      {tpl.content}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-3 pt-1">
              <p className="text-xs text-muted-content">
                {t('showing', { current: currentPage, total: totalPages })}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label={t('previous')}
                  className="inline-flex h-8 items-center gap-1 rounded-lg border border-ui bg-surface px-2.5 text-xs font-medium text-primary-content transition-colors hover:bg-item-hover disabled:pointer-events-none disabled:opacity-50"
                >
                  <ChevronLeft size={14} aria-hidden />
                  {t('previous')}
                </button>

                <button
                  type="button"
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label={t('next')}
                  className="inline-flex h-8 items-center gap-1 rounded-lg border border-ui bg-surface px-2.5 text-xs font-medium text-primary-content transition-colors hover:bg-item-hover disabled:pointer-events-none disabled:opacity-50"
                >
                  {t('next')}
                  <ChevronRight size={14} aria-hidden />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <ItemPickerModal
        id="PICK_TEMPLATES"
        title="Modelos de mensagem"
        description="Escolha um modelo para começar a mensagem."
        icon={FileText}
        items={pickerItems}
        selectedIds={selectedId ? [selectedId] : []}
        mode="single"
        pageSize={6}
        emptyMessage="Nenhum modelo criado."
        confirmLabel="Usar modelo"
        onConfirm={handlePickerConfirm}
      />
    </div>
  );
}

export default TemplatesCard;
