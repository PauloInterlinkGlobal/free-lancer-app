import { Metadata } from 'next';
import { PendingActivationView } from '@/modules/account/pending-activation/components/PendingActivationView';

export const metadata: Metadata = {
  title: 'Ativação Pendente | SMSillico',
};

export default function PendingActivationPage() {
  return <PendingActivationView />;
}
