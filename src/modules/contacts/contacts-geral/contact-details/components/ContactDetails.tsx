import { Link } from '@/core/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import type { IContactDetails } from '../interfaces/contact-details';
import { ContactDetailsStats } from './ContactDetailsStats';
import { ContactMessagesTable } from './ContactMessagesTable';

interface ContactDetailsProps {
  details: IContactDetails;
  currentPage: number;
}

export function ContactDetails({ details, currentPage }: ContactDetailsProps) {
  const { contact, stats, messages, totalPages } = details;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link
          href="/contacts"
          aria-label="Voltar aos contactos"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-raised text-primary-content transition-colors hover:bg-item-hover"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </Link>

        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-primary-content">
            {contact.name}
          </h1>
          <p className="text-sm text-muted-content">Detalhes do contacto</p>
        </div>
      </div>

      <ContactDetailsStats number={contact.number} stats={stats} />

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-primary-content">
          Histórico de mensagens
        </h2>

        <ContactMessagesTable
          data={messages}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </section>
    </div>
  );
}
