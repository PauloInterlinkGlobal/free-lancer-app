'use client';

import Pagination from '@/core/components/Pagination/Pagination';
import { ViewToggle, type ViewMode } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { useModalStore } from '@/core/store/useModalStore';
import {
  senderStatusBadgeStyles,
  senderStatusIcons,
  senderStatusLabel,
} from '@/modules/senders/constants/senders';
import { ISender } from '@/modules/senders/interfaces/senders';
import { formatSenderDate } from '@/modules/senders/utils/senders-format';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DeleteSenderModal, DetailSenderModal } from './Modal';
import { SendersTable } from './SendersTable';

import { CheckCircle2, Eye, MessageSquare, Send, Trash2 } from 'lucide-react';

interface SendersCardsProps {
  items: ISender[];
  currentPage: number;
  totalPages: number;
}

export function SendersCards({
  items,
  currentPage,
  totalPages,
}: SendersCardsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { openModal } = useModalStore();

  const [selectedSender, setSelectedSender] = useState<ISender | null>(null);
  const [view, setView] = useState<ViewMode>('grid');

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) params.delete('page');
    else params.set('page', String(page));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const onView = (sender: ISender) => {
    setSelectedSender(sender);
    openModal('DETAIL_SENDER');
  };

  const onDelete = (sender: ISender) => {
    setSelectedSender(sender);
    openModal('DELETE_SENDER');
  };

  const empty = (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-ui bg-surface/50 p-12 text-center">
      <div className="flex h-10 w-10 items-center justify-center text-primary">
        <MessageSquare className="h-6 w-6" />
      </div>
      <h3 className="mt-3 text-base font-semibold text-primary-content">
        Nenhum remetente encontrado
      </h3>
      <p className="mt-1 max-w-sm text-xs text-muted-content">
        Tente ajustar os filtros de pesquisa ou solicite um novo remetente para
        começar a enviar SMS.
      </p>
    </div>
  );

  const cards = (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((sender) => {
        const StatusIcon = senderStatusIcons[sender.status] || CheckCircle2;
        const initials = sender.sender.trim().slice(0, 2).toUpperCase() || 'ID';

        return (
          <div
            key={sender.id}
            className="group relative flex flex-col justify-between rounded-xl border border-border-ui bg-surface p-4 transition-colors duration-200 hover:bg-surface-raised"
          >
            {/* Top Card Header */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-content">
                      Sender ID
                    </span>
                    <h3 className="truncate text-sm font-medium text-primary-content">
                      {sender.sender}
                    </h3>
                  </div>
                </div>

                <div
                  className={`inline-flex shrink-0 items-center gap-1.5  px-2.5 py-0.5 text-xs font-medium ${senderStatusBadgeStyles[sender.status]}`}
                >
                  <StatusIcon className="h-3.5 w-3.5" />
                  <span>{senderStatusLabel[sender.status]}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 line-clamp-2 min-h-[36px] text-xs text-muted-content">
                {sender.description || 'Nenhuma descrição fornecida.'}
              </p>
            </div>

            {/* Dates & Footer Actions */}
            <div className="mt-4 border-t border-dashed border-border-ui pt-3">
              <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-content">
                <div className="flex flex-col">
                  <span className="font-medium text-text-muted">Criação:</span>
                  <span className="font-semibold text-primary-content">
                    {formatSenderDate(sender.createdAt)}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-medium text-text-muted">
                    Validação:
                  </span>
                  <span className="font-semibold text-primary-content">
                    {formatSenderDate(sender.validatedAt)}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onView(sender)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-ui bg-surface-raised px-3 py-2 text-sm text-secondary-content transition-colors hover:bg-item-hover hover:text-primary-content"
                >
                  <Eye className="h-4 w-4" />
                  <span>Ver Detalhes</span>
                </button>

                {sender.status === 'validated' && (
                  <button
                    type="button"
                    onClick={() => router.push('/send-sms')}
                    title="Enviar SMS com este remetente"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                    <span>Enviar SMS</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onDelete(sender)}
                  title="Eliminar remetente"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-rose-500/10 hover:text-rose-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const table = (
    <SendersTable
      items={items}
      currentPage={currentPage}
      totalPages={totalPages}
      onView={onView}
      onDelete={onDelete}
    />
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <ViewToggle value={view} onChange={setView} />
        </div>

        {view === 'list' ? table : items.length === 0 ? empty : cards}

        {view === 'grid' && totalPages > 1 && (
          <div className="overflow-hidden rounded-xl border border-border-ui">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <DetailSenderModal
        sender={selectedSender}
        onClose={() => setSelectedSender(null)}
      />

      <DeleteSenderModal
        sender={selectedSender}
        onClose={() => setSelectedSender(null)}
      />
    </>
  );
}
