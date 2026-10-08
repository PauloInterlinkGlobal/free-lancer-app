<<<<<<< Updated upstream
import { BreadcrumbClient } from './BreadcrumbClient';

export function Breadcrumb() {
  return <BreadcrumbClient />;
=======
"use client";

import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";

import { usePathBreadcrumb } from "@/core/hooks/use-path-breadcrumb";
import { usePathname, useRouter } from "@/core/i18n/navigation";
import { DashboardBreadcrumbButtons } from "./BreadcrumbButtons/DashboardBreadcrumbButtons";
import { ContactsBreadcrumbButtons } from "./BreadcrumbButtons/ContactsBreadcrumbButtons";
import { HistoryBreadcrumbButtons } from "./BreadcrumbButtons/HistoryBreadcrumbButtons";
import { ReportsBreadcrumbButtons } from "./BreadcrumbButtons/ReportsBreadcrumbButtons";
import { SendersBreadcrumbButtons } from "./BreadcrumbButtons/SendersBreadcrumbButtons";
import { TemplatesBreadcrumbButtons } from "./BreadcrumbButtons/TemplatesBreadcrumbButtons";

export function Breadcrumb() {
  const { items, title, description } = usePathBreadcrumb();
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/menu") return null;

  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  const isDashboard = lastSegment === "dashboard";
  const isHistory = lastSegment === "history";
  const isContactsPage =
    segments.includes("contacts") && lastSegment === "contacts";
  const isSendersPage = lastSegment === "senders";
  const isReportsPage =
    lastSegment === "reports" || lastSegment === "relatorios";
  const isTemplatesPage =
    lastSegment === "model-messanger" ||
    lastSegment === "template" ||
    lastSegment === "modelos";

  const renderActions = () => {
    if (isDashboard) {
      return <DashboardBreadcrumbButtons />;
    }

    if (isHistory) {
      return (
        <HistoryBreadcrumbButtons
          onExport={() => console.log("Exportar histórico")}
          onClear={() => console.log("Limpar histórico")}
        />
      );
    }

    if (isContactsPage) {
      return (
        <ContactsBreadcrumbButtons
          onImport={() => router.push("/contacts/import")}
          onExport={() => console.log("Exportar contactos")}
          onAdd={() => console.log("Adicionar contacto")}
        />
      );
    }

    if (isSendersPage) {
      return <SendersBreadcrumbButtons />;
    }

    if (isReportsPage) {
      return <ReportsBreadcrumbButtons />;
    }

    if (isTemplatesPage) {
      return <TemplatesBreadcrumbButtons />;
    }

    return null;
  };

  return (
    <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex min-w-0 flex-col gap-3">
        {/* Desktop: breadcrumb normal */}
        <nav aria-label="Breadcrumb" className="hidden lg:block">
          <ol className="flex flex-wrap items-center gap-1 text-sm">
            {items.map((item, index) => (
              <li key={item.label} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight
                    size={14}
                    aria-hidden
                    className="text-muted-content/60"
                  />
                )}

                {item.href ? (
                  <Link
                    href={item.href}
                    className="rounded-lg px-2 py-1 text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    className="rounded-lg bg-surface-raised px-2 py-1 font-medium text-primary-content"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile e tablet: botão de menu (abre a página /menu) */}
          <button
            type="button"
            onClick={() => router.push("/menu")}
            aria-label="Abrir menu"
            className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-content transition-colors hover:bg-surface-raised active:bg-surface-subtle lg:hidden"
          >
            <Menu size={24} />
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

      <div className="flex-shrink-0">{renderActions()}</div>
    </div>
  );
>>>>>>> Stashed changes
}
