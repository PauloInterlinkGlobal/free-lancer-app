import { BankTransferStep } from '@/modules/payments/components/BankTransferStep';
import { paymentsMock } from '@/modules/payments/mocks/payments.mock';
import { canUploadProof } from '@/modules/payments/utils/payments-filters';
import { notFound } from 'next/navigation';

interface TopUpReferencePageProps {
  params: Promise<{ reference: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function TopUpReferencePage({
  params,
  searchParams,
}: TopUpReferencePageProps) {
  const { reference } = await params;
  const { amount: rawAmount } = await searchParams;

  const payment = paymentsMock.find((p) => p.reference === reference);

  if (payment && !canUploadProof(payment)) notFound();

  const amount =
    payment?.amount ??
    Number(Array.isArray(rawAmount) ? rawAmount[0] : rawAmount);

  if (!amount || Number.isNaN(amount)) notFound();

  return <BankTransferStep reference={reference} amount={amount} />;
}
