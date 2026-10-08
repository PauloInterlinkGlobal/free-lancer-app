import { DraftList } from '@/modules/send-sms/draft-sms/components/DraftList';
import { draftSmsMock } from '@/modules/send-sms/draft-sms/mocks/draft-sms.mock';
import { parseDraftFilters } from '@/modules/send-sms/draft-sms/utils/draft-filters';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rascunhos',
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function DraftSmsPage({ searchParams }: PageProps) {
  const filters = parseDraftFilters(await searchParams);

  return <DraftList data={draftSmsMock} filters={filters} />;
}
