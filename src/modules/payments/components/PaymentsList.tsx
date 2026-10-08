import { statusLabel } from '@/modules/payments/constants/payments';
import { IPayment } from '@/modules/payments/interfaces/payments';
import {
  canUploadProof,
  filterPayments,
  paginate,
  type PaymentsFiltersValue,
} from '@/modules/payments/utils/payments-filters';
import { PaymentsFilters } from './PaymentsFilters';
import { PaymentsStats } from './PaymentsStats';
import { PaymentsTable } from './PaymentsTable';
import { TopUpCard } from './TopUpCard';

interface PaymentsListProps {
  data: IPayment[];
  filters: PaymentsFiltersValue;
}

const statusOptions = Object.entries(statusLabel).map(([value, label]) => ({
  value,
  label,
}));

export function PaymentsList({ data, filters }: PaymentsListProps) {
  const { items, currentPage, totalPages } = paginate(
    filterPayments(data, filters),
    filters.page
  );

  const pendingCount = data.filter(
    (p) => p.status === 'pending' && canUploadProof(p)
  ).length;

  return (
    <div className="flex flex-col gap-4">
      <PaymentsStats data={data} />

      <TopUpCard pendingCount={pendingCount} />

      <PaymentsFilters statusOptions={statusOptions} />

      <PaymentsTable
        data={items}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
