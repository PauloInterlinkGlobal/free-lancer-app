import { smsBalanceMock } from '@/core/components/Header/header-data';
import { Link } from '@/core/i18n/navigation';
import { Wallet } from 'lucide-react';

export function HeaderWallet() {
  const balance = smsBalanceMock;

  return (
    <Link
      href="/payments"
      title="SMS disponível"
      className="flex h-9 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/30"
    >
      <Wallet className="h-4 w-4" />
      <span>{balance.toLocaleString('pt-PT')}</span>
      <span className="hidden font-normal sm:inline">SMS</span>
    </Link>
  );
}
