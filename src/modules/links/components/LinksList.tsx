'use client';

import { usePathname, useRouter } from '@/core/i18n/navigation';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ILink } from '../interfaces/links';
import {
  filterLinks,
  paginate,
  type LinksFiltersValue,
} from '../utils/links-filters';
import { LinksFilters } from './LinksFilters';
import { LinksTable } from './LinksTable';
import { AddLinkModal, DeleteLinkModal } from './Modal';

interface LinksListProps {
  initialData: ILink[];
  filters: LinksFiltersValue;
}

export function LinksList({ initialData, filters }: LinksListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { openModal } = useModalStore();
  const { success } = useToastStore();

  const [links, setLinks] = useState<ILink[]>(initialData);
  const [selectedLink, setSelectedLink] = useState<ILink | null>(null);

  // Aplica filtros e paginação aos links do estado
  const filtered = filterLinks(links, filters);
  const { items, currentPage, totalPages } = paginate(filtered, filters.page);

  // Garante que, ao eliminar o último item de uma página, recua para uma página válida
  useEffect(() => {
    if (filters.page > totalPages && totalPages > 0) {
      const params = new URLSearchParams(searchParams.toString());
      if (totalPages <= 1) {
        params.delete('page');
      } else {
        params.set('page', String(totalPages));
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
  }, [filters.page, totalPages, pathname, router, searchParams]);

  const handleCreate = (values: { url: string; description: string }) => {
    // TODO(api): Substituir criação local por chamada de API quando disponível.
    const newLink: ILink = {
      id: `link-${Date.now()}`,
      description: values.description,
      url: values.url,
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      status: 'pending',
    };

    setLinks((prev) => [newLink, ...prev]);
  };

  const handleOpenDelete = (link: ILink) => {
    setSelectedLink(link);
    openModal('DELETE_LINK');
  };

  const handleDelete = (link: ILink) => {
    // TODO(api): Substituir remoção local por chamada de API quando disponível.
    setLinks((prev) => prev.filter((l) => l.id !== link.id));
    success(`Link "${link.description}" eliminado com sucesso!`);
    setSelectedLink(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <LinksFilters />

      <LinksTable
        data={items}
        currentPage={currentPage}
        totalPages={totalPages}
        onDelete={handleOpenDelete}
      />

      <AddLinkModal
        existingUrls={links.map((l) => l.url)}
        onCreate={handleCreate}
      />

      <DeleteLinkModal
        link={selectedLink}
        onConfirm={handleDelete}
        onClose={() => setSelectedLink(null)}
      />
    </div>
  );
}
