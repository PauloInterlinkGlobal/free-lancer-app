import type { ReactNode } from 'react';

interface SectionCardProps {
  step: number;
  title: string;
  description?: string;
  aside?: ReactNode;
  children: ReactNode;
}

export function SectionCard({
  step,
  title,
  description,
  aside,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-border-ui bg-surface p-5 shadow-sm">
      <header className="mb-5 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
          {step}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-primary-content">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs text-muted-content">{description}</p>
          )}
        </div>
        {aside}
      </header>

      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}
