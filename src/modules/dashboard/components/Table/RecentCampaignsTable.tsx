'use client';

import { Table, type Column } from '@/core/components/Table';
import { ICampaign } from '@/modules/dashboard/interfaces/dashboard';

const statusStyles: Record<ICampaign['status'], string> = {
  active: 'bg-emerald-500/10 text-emerald-500',
  paused: 'bg-secondary/10 text-secondary',
  completed: 'bg-surface-raised text-secondary-content',
};

const statusLabel: Record<ICampaign['status'], string> = {
  active: 'Ativa',
  paused: 'Pausada',
  completed: 'Concluída',
};

const columns: Column<ICampaign>[] = [
  {
    key: 'name',
    header: 'Tipo',
    className: 'font-medium text-primary-content',
  },
  {
    key: 'status',
    header: 'Estado',
    render: (campaign) => (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[campaign.status]}`}
      >
        {statusLabel[campaign.status]}
      </span>
    ),
  },
  {
    key: 'sent',
    header: 'Enviados',
    render: (campaign) => campaign.sent.toLocaleString(),
  },
  {
    key: 'delivered',
    header: 'Entregues',
    render: (campaign) => campaign.delivered.toLocaleString(),
  },
  {
    key: 'date',
    header: 'Data',
    className: 'text-muted-content',
  },
];

interface RecentCampaignsTableProps {
  campaigns: ICampaign[];
  loading?: boolean;
}

export function RecentCampaignsTable({
  campaigns,
  loading = false,
}: RecentCampaignsTableProps) {
  return (
    <Table<ICampaign>
      columns={columns}
      data={campaigns}
      loading={loading}
      keyExtractor={(campaign) => campaign.id}
      emptyMessage="Ainda não existem SMS em massa registrada."
    />
  );
}
