import { PaymentDetails } from '@/modules/payments/components/PaymentDetails';
import { getPaymentByReference } from '@/modules/payments/utils/payments-filters';
import { notFound } from 'next/navigation';

export default async function PaymentDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { reference } = await params;
  const { amount: rawAmount } = await searchParams;

  const decodedReference = decodeURIComponent(reference);
  const payment = getPaymentByReference(decodedReference);

  if (payment) {
    return <PaymentDetails payment={payment} />;
  }

  const amount = Number(Array.isArray(rawAmount) ? rawAmount[0] : rawAmount);

  if (!amount || Number.isNaN(amount)) {
    notFound();
  }

  return (
    <PaymentDetails
      payment={{
        id: decodedReference,
        reference: decodedReference,
        method: 'transfer',
        amount,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }}
    />
  );
}
