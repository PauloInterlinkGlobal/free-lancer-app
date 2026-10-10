import {
  IApiLog,
  IApiStats,
  IWebhook,
} from '@/modules/api-integration/interfaces/api-integration';
import { ApiIntegrationWrapper } from './ApiIntegrationWrapper';
import { ApiKeysTable } from './ApiKeysTable';
import { ApiLogsTable } from './ApiLogsTable';
import { ApiStats } from './ApiStats';
import { ApiWebhooks } from './ApiWebhooks';

interface ApiIntegrationListProps {
  stats: IApiStats;
  webhooks: IWebhook[];
  logs: IApiLog[];
}

export function ApiIntegrationList({
  stats,
  webhooks,
  logs,
}: ApiIntegrationListProps) {
  return (
    <ApiIntegrationWrapper>
      <div className="flex flex-col gap-6">
        <ApiStats stats={stats} />
        <ApiKeysTable />
        <ApiWebhooks data={webhooks} />
        <ApiLogsTable data={logs} />
      </div>
    </ApiIntegrationWrapper>
  );
}
