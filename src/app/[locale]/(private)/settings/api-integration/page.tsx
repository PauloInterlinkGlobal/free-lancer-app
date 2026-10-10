import { ApiIntegrationList } from '@/modules/api-integration/components/ApiIntegrationList';
import {
  apiLogsMock,
  apiStatsMock,
  webhooksMock,
} from '@/modules/api-integration/mocks/api-integration.mock';

export default function ApiIntegrationPage() {
  return (
    <ApiIntegrationList
      stats={apiStatsMock}
      webhooks={webhooksMock}
      logs={apiLogsMock}
    />
  );
}
