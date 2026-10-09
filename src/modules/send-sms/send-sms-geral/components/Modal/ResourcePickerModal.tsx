'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { useModalStore } from '@/core/store/useModalStore';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

export interface ResourcePickerItem { id: string; title: string; description?: string; meta?: string }
interface Props { type: 'groups' | 'templates' | 'links'; items: ResourcePickerItem[]; onSelect: (item: ResourcePickerItem) => void }

const labels = { groups: 'grupos', templates: 'modelos', links: 'links' } as const;
const pageSize = 6;

export function ResourcePickerModal({ type, items, onSelect }: Props) {
  const { activeModal, closeModal } = useModalStore();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const normalize = (value: string) =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    if (!normalizedQuery) return items;
    return items.filter((item) =>
      normalize(`${item.title} ${item.description ?? ''} ${item.meta ?? ''}`).includes(
        normalizedQuery
      )
    );
  }, [items, query]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  if (activeModal !== 'SELECT_SMS_RESOURCE') return null;
  return <Modal id="SELECT_SMS_RESOURCE">
    <div role="dialog" aria-modal="true" className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl">
      <div className="flex items-start justify-between gap-4 border-b border-divider px-6 py-5"><div><h2 className="text-lg font-semibold text-primary-content">Selecionar {labels[type]}</h2><p className="mt-1 text-sm text-muted-content">Pesquise e selecione um item para inserir.</p></div><button type="button" onClick={closeModal} aria-label="Fechar" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content hover:bg-item-hover"><X size={18}/></button></div>
      <div className="flex flex-col gap-4 px-6 py-5"><Input leftIcon={Search} placeholder={`Pesquisar ${labels[type]}...`} value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        <div className="grid max-h-[min(55vh,420px)] gap-2 overflow-y-auto">{pageItems.map((item) => <button key={item.id} type="button" onClick={() => { onSelect(item); closeModal(); }} className="flex items-center justify-between gap-3 rounded-xl border border-border-ui bg-surface p-3 text-left hover:border-primary/50 hover:bg-item-hover"><span className="min-w-0"><strong className="block truncate text-sm text-primary-content">{item.title}</strong>{item.description && <span className="mt-1 block line-clamp-2 text-xs text-muted-content">{item.description}</span>}</span>{item.meta && <span className="shrink-0 rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">{item.meta}</span>}</button>)}{pageItems.length === 0 && <p className="py-8 text-center text-sm text-muted-content">Nenhum item encontrado.</p>}</div>
        <div className="flex items-center justify-between text-xs text-muted-content"><span>{filtered.length} item(ns)</span><div className="flex items-center gap-2"><button type="button" disabled={currentPage === 1} onClick={() => setPage((p) => p - 1)} aria-label="Página anterior" className="rounded-lg border border-border-ui p-2 disabled:opacity-40"><ChevronLeft size={15}/></button><span>Página {currentPage} de {totalPages}</span><button type="button" disabled={currentPage === totalPages} onClick={() => setPage((p) => p + 1)} aria-label="Próxima página" className="rounded-lg border border-border-ui p-2 disabled:opacity-40"><ChevronRight size={15}/></button></div></div>
      </div>
    </div>
  </Modal>;
}
export default ResourcePickerModal;
