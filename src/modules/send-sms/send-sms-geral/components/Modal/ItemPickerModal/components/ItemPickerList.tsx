'use client';

import Pagination from '@/core/components/Pagination/Pagination';
import { Check, Inbox, SearchX } from 'lucide-react';
import React from 'react';
import type { ItemPickerItem } from '../types';

interface ItemPickerListProps {
  items: ItemPickerItem[];
  filteredItems: ItemPickerItem[];
  pageItems: ItemPickerItem[];
  draft: string[];
  mode: 'single' | 'multiple';
  currentPage: number;
  totalPages: number;
  emptyMessage?: string;
  onToggleItem: (id: string) => void;
  onPageChange: (page: number) => void;
}

export function ItemPickerList({
  items,
  filteredItems,
  pageItems,
  draft,
  mode,
  currentPage,
  totalPages,
  emptyMessage = 'Nenhum item disponível.',
  onToggleItem,
  onPageChange,
}: ItemPickerListProps) {
  // Caso 1: Lista original vazia
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-ui py-12 text-center">
        <Inbox className="h-10 w-10 text-muted-content/60" aria-hidden />
        <p className="mt-2 text-sm font-medium text-primary-content">
          {emptyMessage}
        </p>
      </div>
    );
  }

  // Caso 2: Pesquisa sem resultados
  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-ui py-12 text-center">
        <SearchX className="h-10 w-10 text-muted-content/60" aria-hidden />
        <p className="mt-2 text-sm font-medium text-primary-content">
          Nenhum resultado encontrado
        </p>
        <p className="text-xs text-muted-content mt-1">
          Tente ajustar os termos de pesquisa.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl border border-border-ui bg-surface overflow-hidden">
      <ul className="divide-y divide-border-ui max-h-[360px] overflow-y-auto">
        {pageItems.map((item) => {
          const isSelected = draft.includes(item.id);

          return (
            <li
              key={item.id}
              onClick={() => onToggleItem(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggleItem(item.id);
                }
              }}
              role={mode === 'single' ? 'radio' : 'checkbox'}
              aria-checked={isSelected}
              tabIndex={0}
              className={`flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none transition-colors outline-none focus-visible:bg-item-hover ${
                isSelected
                  ? 'bg-primary/5 hover:bg-primary/10'
                  : 'hover:bg-item-hover'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Indicador de selecção — estilo checkbox em ambos os modos */}
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
                    isSelected
                      ? 'border-primary bg-primary text-white'
                      : 'border-border-ui bg-surface'
                  }`}
                  aria-hidden
                >
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  )}
                </div>

                {/* Conteúdo textual */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-medium ${
                      isSelected ? 'text-primary' : 'text-primary-content'
                    }`}
                  >
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p
                      className="truncate text-xs text-muted-content"
                      title={item.subtitle}
                    >
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Tag / Meta opcional */}
              {item.meta && (
                <span className="shrink-0 rounded-full bg-surface-raised px-2.5 py-0.5 text-[11px] font-medium text-muted-content">
                  {item.meta}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Paginação */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
