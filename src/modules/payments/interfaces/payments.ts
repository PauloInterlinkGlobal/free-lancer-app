export type PaymentMethod = 'paypay' | 'transfer';
export type PaymentStatus = 'pending' | 'review' | 'approved' | 'rejected';

export interface IPayment {
  id: string;
  reference: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  transferReference?: string;
  proofName?: string;
}
