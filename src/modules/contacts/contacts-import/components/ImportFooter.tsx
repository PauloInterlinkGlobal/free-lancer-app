import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ImportFooterProps {
  showBack: boolean;
  nextLabel: string;
  nextDisabled: boolean;
  summary?: string;
  onBack: () => void;
  onNext: () => void;
}

export function ImportFooter({
  showBack,
  nextLabel,
  nextDisabled,
  summary,
  onBack,
  onNext,
}: ImportFooterProps) {
  return (
    <div className="sticky bottom-0 z-10 mt-auto pb-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-full bg-surface p-2 shadow-lg">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex min-h-11 items-center gap-2 rounded-full bg-surface-raised px-5 text-sm font-semibold text-primary-content transition-colors hover:bg-item-hover"
          >
            <ArrowLeft size={18} aria-hidden />
            Voltar
          </button>
        )}

        {summary && (
          <p className="min-w-0 flex-1 truncate px-3 text-sm text-muted-content">
            {summary}
          </p>
        )}

        <button
          type="button"
          disabled={nextDisabled}
          onClick={onNext}
          className="flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {nextLabel}
          <ArrowRight size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}
