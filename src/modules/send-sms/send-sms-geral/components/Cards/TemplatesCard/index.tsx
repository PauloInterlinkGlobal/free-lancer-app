'use client';

import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { ISmsTemplate } from '../../../interfaces';

interface TemplatesCardProps {
  templates: ISmsTemplate[];
  onSelect: (content: string) => void;
}

const PAGE_SIZE = 4; // 2 colunas x 2 linhas

export function TemplatesCard({ templates, onSelect }: TemplatesCardProps) {
  const t = useTranslations('pagination');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(templates.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = templates.slice(start, start + PAGE_SIZE);

  function handleSelect(tpl: ISmsTemplate) {
    setSelectedId(tpl.id);
    onSelect(tpl.content);
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-primary-content">
        Começar a partir de um modelo
      </span>

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
                  onClick={() => handleSelect(tpl)}
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
    </div>
  );
}
