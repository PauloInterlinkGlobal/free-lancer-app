import { ALL } from '@/modules/payments/constants/payments';
import {
  IPayment,
  PaymentStatus,
} from '@/modules/payments/interfaces/payments';
import { paymentsMock } from '@/modules/payments/mocks/payments.mock';

export const PAGE_SIZE = 5;

export interface PaymentsFiltersValue {
  search: string;
  status: string;
  dateFrom: string;
  dateTo: string;
  page: number;
}

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

const isoDay = (v: string | string[] | undefined) => {
  const value = first(v) ?? '';
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';
};

const dayFormatter = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'Africa/Luanda',
});

const toDay = (iso: string) => dayFormatter.format(new Date(iso));

export function parsePaymentsFilters(params: RawParams): PaymentsFiltersValue {
  return {
    search: first(params.search) ?? '',
    status: first(params.status) ?? ALL,
    dateFrom: isoDay(params.dateFrom),
    dateTo: isoDay(params.dateTo),
    page: Math.max(1, Number(first(params.page)) || 1),
  };
}

export function filterPayments(
  data: IPayment[],
  filters: PaymentsFiltersValue
): IPayment[] {
  const search = filters.search.trim().toLowerCase();

  return data
    .filter((payment) => {
      const day = toDay(payment.createdAt);

      const matchesSearch =
        !search || payment.reference.toLowerCase().includes(search);
      const matchesStatus =
        filters.status === ALL || payment.status === filters.status;
      const matchesFrom = !filters.dateFrom || day >= filters.dateFrom;
      const matchesTo = !filters.dateTo || day <= filters.dateTo;

      return matchesSearch && matchesStatus && matchesFrom && matchesTo;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function getPaymentsStats(data: IPayment[]) {
  const count = (status: PaymentStatus) =>
    data.filter((p) => p.status === status).length;

  return {
    totalApproved: data
      .filter((p) => p.status === 'approved')
      .reduce((sum, p) => sum + p.amount, 0),
    pending: count('pending'),
    review: count('review'),
    rejected: count('rejected'),
  };
}

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  return {
    items: items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    currentPage,
    totalPages,
  };
}

export const canUploadProof = (payment: IPayment) =>
  payment.method === 'transfer' &&
  (payment.status === 'pending' || payment.status === 'rejected');

export const getPaymentByReference = (
  reference: string
): IPayment | undefined => paymentsMock.find((p) => p.reference === reference);
