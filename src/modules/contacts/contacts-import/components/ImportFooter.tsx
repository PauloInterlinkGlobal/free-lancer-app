import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ImportFooterProps {
  showBack: boolean;
  nextLabel: string;
  nextDisabled?: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function ImportFooter({
  showBack,
  nextLabel,
  nextDisabled = false,
  onBack,
  onNext,
}: ImportFooterProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
        >
          <ArrowLeft size={16} aria-hidden />
          Voltar
        </button>
      ) : (
        <span />
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {nextLabel}
        <ArrowRight size={16} aria-hidden />
      </button>
    </div>
  );
}
