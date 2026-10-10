'use client';

import { Table, type Column } from '@/core/components/Table';
import {
  ALL,
  LOGS_PER_PAGE,
  logSourceLabel,
  logSourceStyles,
  statusCodeStyles,
} from '@/modules/api-integration/constants/api-integration';
import {
  ApiLogSource,
  IApiLog,
} from '@/modules/api-integration/interfaces/api-integration';
import { formatApiDate } from '@/modules/api-integration/utils/api-integration-format';
import { useMemo, useState } from 'react';

interface ApiLogsTableProps {
  data: IApiLog[];
}

type SourceFilter = ApiLogSource | typeof ALL;

const filters: { value: SourceFilter; label: string }[] = [
  { value: ALL, label: 'Todos' },
  { value: 'api', label: logSourceLabel.api },
  { value: 'webhook', label: logSourceLabel.webhook },
];

const columns: Column<IApiLog>[] = [
  {
    key: 'source',
    header: 'Origem',
    render: (l) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${logSourceStyles[l.source]}`}
      >
        {logSourceLabel[l.source]}
      </span>
    ),
  },
  { key: 'method', header: 'Método' },
  {
    key: 'endpoint',
    header: 'Endpoint',
    render: (l) => <span className="font-mono text-xs">{l.endpoint}</span>,
  },
  {
    key: 'statusCode',
    header: 'Estado',
    render: (l) => (
      <span className={`font-semibold ${statusCodeStyles(l.statusCode)}`}>
        {l.statusCode}
      </span>
    ),
  },
  { key: 'ip', header: 'IP' },
  {
    key: 'durationMs',
    header: 'Duração',
    render: (l) => `${l.durationMs} ms`,
  },
  {
    key: 'createdAt',
    header: 'Data',
    className: 'text-muted-content',
    render: (l) => formatApiDate(l.createdAt),
  },
];

export function ApiLogsTable({ data }: ApiLogsTableProps) {
  const [source, setSource] = useState<SourceFilter>(ALL);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (source === ALL ? data : data.filter((l) => l.source === source)),
    [data, source]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / LOGS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const items = filtered.slice(
    (currentPage - 1) * LOGS_PER_PAGE,
    currentPage * LOGS_PER_PAGE
  );

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-primary-content">
            Logs de acesso
          </h2>
          <p className="text-sm text-muted-content">
            Registo de todas as chamadas à API e aos webhooks.
          </p>
        </div>

        <div className="flex gap-1" role="tablist">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={source === f.value}
              onClick={() => {
                setSource(f.value);
                setPage(1);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                source === f.value
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-content hover:bg-item-hover'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Table
        columns={columns}
        data={items}
        keyExtractor={(l) => l.id}
        allowGrid
        emptyMessage="Sem registos de acesso."
        pagination={{ currentPage, totalPages, onPageChange: setPage }}
      />
    </section>
  );
}
