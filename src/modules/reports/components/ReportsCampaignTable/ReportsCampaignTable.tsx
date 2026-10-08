'use client';

import { Table, type Column } from '@/core/components/Table';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { FileText, Send } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  campaignStatusLabel,
  campaignStatusStyles,
} from '../../constants/reports';
import { ICampaignReport } from '../../interfaces/reports';
import { ReportsTableFilters } from '../ReportsTableFilters/ReportsTableFilters';

interface ReportsCampaignTableProps {
  data: ICampaignReport[];
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  loading?: boolean;
}

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Africa/Luanda',
});

const formatDate = (iso: string) => {
  try {
    return dateFormatter.format(new Date(iso));
  } catch {
    return iso;
  }
};

const formatCost = (val: number, currency = 'Kz') => {
  return `${val.toFixed(2).replace('.', ',')} ${currency}`;
};

const columns = (
  onView?: (item: ICampaignReport) => void,
  onExport?: (item: ICampaignReport) => void
): Column<ICampaignReport>[] => [
  {
    key: 'name',
    header: 'Campanha',
    render: (item) => (
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-raised border border-ui text-muted-content">
          <FileText size={18} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-primary-content tracking-tight">
            {item.name}
          </span>
          <span className="text-[11px] text-muted-content">
            {formatDate(item.createdAt)}
          </span>
        </div>
      </div>
    ),
  },
  {
    key: 'sender',
    header: 'Remetente',
    render: (item) => (
      <span className="inline-flex items-center gap-1 rounded-md bg-surface-raised border border-ui px-2.5 py-1 text-xs font-semibold text-primary-content">
        <Send size={11} className="text-primary" />
        {item.sender}
      </span>
    ),
  },
  {
    key: 'totalRecipients',
    header: 'Destinatários & Entrega',
    render: (item) => {
      const percentage =
        item.totalRecipients > 0
          ? Math.round((item.deliveredCount / item.totalRecipients) * 100)
          : 0;

      return (
        <div className="flex w-44 flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-primary-content">
              {item.deliveredCount}/{item.totalRecipients}
            </span>
            <span className="font-semibold text-emerald-500">
              {percentage}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-raised">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    key: 'cost',
    header: 'Custo',
    className: 'font-semibold text-primary-content tracking-tight',
    render: (item) => formatCost(item.cost, item.currency),
  },
  {
    key: 'status',
    header: 'Estado',
    render: (item) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs tracking-wider ${campaignStatusStyles[item.status]}`}
      >
        {campaignStatusLabel[item.status]}
      </span>
    ),
  },
];

export function ReportsCampaignTable({
  data,
  currentPage,
  totalPages,
  loading = false,
}: ReportsCampaignTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCampaign, setSelectedCampaign] =
    useState<ICampaignReport | null>(null);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) params.delete('page');
    else params.set('page', String(page));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleView = (item: ICampaignReport) => {
    setSelectedCampaign(item);
  };

  const handleExport = (item: ICampaignReport) => {
    console.log('Exportar relatório da campanha:', item.name);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-ui bg-surface shadow-sm overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-divider p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-bold text-primary-content tracking-tight">
            Relatório
          </h3>
          <p className="text-xs text-muted-content mt-0.5">
            Histórico analítico de disparos e performance por lote
          </p>
        </div>

        <ReportsTableFilters />
      </div>

      <Table<ICampaignReport>
        columns={columns(handleView, handleExport)}
        data={data}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyMessage="Nenhuma campanha encontrada com os filtros selecionados."
        className="rounded-none border-none shadow-none"
        pagination={{
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
        }}
      />
    </div>
  );
}
