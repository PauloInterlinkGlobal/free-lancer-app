import { useTranslations } from 'next-intl';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}) => {
  const t = useTranslations('pagination');

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-ui bg-surface px-6 py-4">
      <p className="text-sm text-muted-content">
        {t('showing', { current: currentPage, total: totalPages })}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={isLoading || currentPage === 1}
          className="flex items-center justify-center rounded-lg border border-ui bg-surface px-3 py-1.5 text-sm font-medium text-primary-content hover:bg-item-hover disabled:opacity-50 transition-colors"
        >
          {t('previous')}
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={isLoading || currentPage === totalPages}
          className="flex items-center justify-center rounded-lg border border-ui bg-surface px-3 py-1.5 text-sm font-medium text-primary-content hover:bg-item-hover disabled:opacity-50 transition-colors"
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
