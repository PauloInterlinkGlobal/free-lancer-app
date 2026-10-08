import { ScheduledList } from '@/modules/send-sms/scheduled-sms/components/ScheduledList';
import { scheduledSmsMock } from '@/modules/send-sms/scheduled-sms/mocks/scheduled-sms.mock';
import { parseScheduledFilters } from '@/modules/send-sms/scheduled-sms/utils/scheduled-filters';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SMS Agendados',
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ScheduledSmsPage({ searchParams }: PageProps) {
  const filters = parseScheduledFilters(await searchParams);

  return <ScheduledList data={scheduledSmsMock} filters={filters} />;
}
