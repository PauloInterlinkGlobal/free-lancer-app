'use client';

import { usePathBreadcrumb } from '@/core/hooks/use-path-breadcrumb';
import { usePathname, useRouter } from '@/core/i18n/navigation';
import { ContactsBreadcrumbButtons } from './BreadcrumbButtons/ContactsBreadcrumbButtons';
import { HistoryBreadcrumbButtons } from './BreadcrumbButtons/HistoryBreadcrumbButtons';
import { ReportsBreadcrumbButtons } from './BreadcrumbButtons/ReportsBreadcrumbButtons';
import { SendersBreadcrumbButtons } from './BreadcrumbButtons/SendersBreadcrumbButtons';

export function BreadcrumbClient() {
  const { title, description } = usePathBreadcrumb();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/menu') return null;

  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  const backHref =
    segments.length > 1 ? `/${segments.slice(0, -1).join('/')}` : '/menu';

  const isHistory = lastSegment === 'history';
  const isContactsPage =
    segments.includes('contacts') && lastSegment === 'contacts';
  const isSendersPage = lastSegment === 'senders';
  const isReportsPage =
    lastSegment === 'reports' || lastSegment === 'relatorios';
  const isTemplatesPage =
    lastSegment === 'sms-template' || lastSegment === 'template';

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
      {/* colocado o Breadcrump no layout
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push(backHref)}
            aria-label="Voltar"
            className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-content transition-colors hover:bg-surface-raised active:bg-surface-subtle lg:hidden"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h1 className="truncate text-xl font-bold leading-tight text-primary-content md:text-2xl">
              {title}
            </h1>

            {description && (
              <p className="line-clamp-1 text-xs text-muted-content md:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
      */}

      <div className="flex-shrink-0">{actions}</div>
    </div>
  );
}
