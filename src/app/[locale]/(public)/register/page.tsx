import { Metadata } from 'next';
import RegisterForm from '@/modules/auth/register/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Criar Conta | SMSillico',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
