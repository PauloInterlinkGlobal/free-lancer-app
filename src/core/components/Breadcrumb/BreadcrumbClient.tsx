'use client';

import { usePathname, useRouter } from '@/core/i18n/navigation';
import { ContactsBreadcrumbButtons } from './BreadcrumbButtons/ContactsBreadcrumbButtons';
import { HistoryBreadcrumbButtons } from './BreadcrumbButtons/HistoryBreadcrumbButtons';
import { ReportsBreadcrumbButtons } from './BreadcrumbButtons/ReportsBreadcrumbButtons';
import { SendersBreadcrumbButtons } from './BreadcrumbButtons/SendersBreadcrumbButtons';

export function BreadcrumbClient() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/menu') return null;

  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  const isHistory = lastSegment === 'history';
  const isContactsPage =
    segments.includes('contacts') && lastSegment === 'contacts';
  const isSendersPage = lastSegment === 'senders';
  const isReportsPage =
    lastSegment === 'reports' || lastSegment === 'relatorios';

  const renderActions = () => {
    if (isHistory) {
      return (
        <HistoryBreadcrumbButtons
          onExport={() => console.log('Exportar histórico')}
          onClear={() => console.log('Limpar histórico')}
        />
      );
    }

    if (isContactsPage) {
      return (
        <ContactsBreadcrumbButtons
          onImport={() => router.push('/contacts/import')}
          onExport={() => console.log('Exportar contactos')}
          onAdd={() => console.log('Adicionar contacto')}
        />
      );
    }

    if (isSendersPage) {
      return <SendersBreadcrumbButtons />;
    }

    if (isReportsPage) {
      return <ReportsBreadcrumbButtons />;
    }

    return null;
  };

  const actions = renderActions();

  if (!actions) return null;

  return (
    <div className="flex w-full items-center justify-end">
      <div className="flex-shrink-0">{actions}</div>
    </div>
  );
}
