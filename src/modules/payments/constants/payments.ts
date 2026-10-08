import {
  PaymentMethod,
  PaymentStatus,
} from '@/modules/payments/interfaces/payments';

export const ALL = 'all';

export const MIN_AMOUNT = 1000;

export const methodLabel: Record<PaymentMethod, string> = {
  paypay: '',
  transfer: 'Transferência',
};

export const statusLabel: Record<PaymentStatus, string> = {
  pending: 'Pendente',
  review: 'Em análise',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
};

export const bankDetails = {
  bank: 'Banco BAI',
  holder: 'Zeno Tecnologias, Lda',
  iban: 'AO06 0040 0000 1234 5678 9012 3',
};

const amountFormatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'AOA',
  maximumFractionDigits: 0,
});

export const formatAmount = (value: number) => amountFormatter.format(value);
