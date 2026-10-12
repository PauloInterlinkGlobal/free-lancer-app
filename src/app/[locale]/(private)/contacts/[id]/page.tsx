import { ContactDetails } from '@/modules/contacts/contacts-geral/contact-details/components';
import { getContactDetails } from '@/modules/contacts/contacts-geral/services/contacts';
import { notFound } from 'next/navigation';

interface ContactDetailsPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function ContactDetailsPage({
  params,
  searchParams,
}: ContactDetailsPageProps) {
  const { id } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const details = await getContactDetails(id, currentPage);
  if (!details) notFound();

  return <ContactDetails details={details} currentPage={currentPage} />;
}
