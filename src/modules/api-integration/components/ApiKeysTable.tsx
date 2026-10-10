'use client';

import { Table, type Column } from '@/core/components/Table';
import { useToastStore } from '@/core/store/toast.store';
import {
  apiKeyStatusLabel,
  apiKeyStatusStyles,
} from '@/modules/api-integration/constants/api-integration';
import { IApiKey } from '@/modules/api-integration/interfaces/api-integration';
import { useApiKeysStore } from '@/modules/api-integration/store/useApiKeysStore';
import { formatApiDate } from '@/modules/api-integration/utils/api-integration-format';
import { useModalStore } from '@/core/store/useModalStore';
import { Ban, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { DeleteApiKeyModal } from './Modal';

export function ApiKeysTable() {
  const keys = useApiKeysStore((s) => s.keys);
  const revokeKey = useApiKeysStore((s) => s.revokeKey);
  const { success } = useToastStore();
  const { openModal } = useModalStore();
  const [keyToDelete, setKeyToDelete] = useState<IApiKey | null>(null);

  const columns: Column<IApiKey>[] = [
    {
      key: 'name',
      header: 'Nome',
      render: (k) => (
        <span className="font-medium text-primary-content">{k.name}</span>
      ),
    },
    {
      key: 'prefix',
      header: 'Chave',
      render: (k) => (
        <span className="font-mono text-xs">{k.prefix}••••••••</span>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (k) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${apiKeyStatusStyles[k.status]}`}
        >
          {apiKeyStatusLabel[k.status]}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Criada em',
      className: 'text-muted-content',
      render: (k) => formatApiDate(k.createdAt),
    },
    {
      key: 'lastUsedAt',
      header: 'Último uso',
      className: 'text-muted-content',
      render: (k) => formatApiDate(k.lastUsedAt, 'Nunca utilizada'),
    },
    {
      key: 'actions',
      header: 'Acções',
      actions: (k) =>
        k.status === 'active'
          ? [
              {
                label: 'Revogar',
                icon: Ban,
                onClick: () => {
                  revokeKey(k.id);
                  success('Chave revogada');
                },
              },
            ]
          : [
              {
                label: 'Eliminar',
                danger: true,
                icon: Trash2,
                onClick: () => {
                  setKeyToDelete(k);
                  openModal('DELETE_API_KEY');
                },
              },
            ],
    },
  ];

  return (
    <>
      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-base font-semibold text-primary-content">
            Chaves de API
          </h2>
          <p className="text-sm text-muted-content">
            Use estas chaves para autenticar os seus pedidos.
          </p>
        </div>

        <Table
          columns={columns}
          data={keys}
          keyExtractor={(k) => k.id}
          allowGrid
          emptyMessage="Ainda não criou nenhuma chave de API."
        />
      </section>

      <DeleteApiKeyModal
        apiKey={keyToDelete}
        onClose={() => setKeyToDelete(null)}
      />
    </>
  );
}
