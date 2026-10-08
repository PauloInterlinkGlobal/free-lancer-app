import { PaymentsList } from '@/modules/payments/components/PaymentsList';
import { paymentsMock } from '@/modules/payments/mocks/payments.mock';
import { parsePaymentsFilters } from '@/modules/payments/utils/payments-filters';

interface PaymentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PaymentsPage({
  searchParams,
}: PaymentsPageProps) {
  const filters = parsePaymentsFilters(await searchParams);

  const data = paymentsMock;

  return <PaymentsList data={data} filters={filters} />;
}
