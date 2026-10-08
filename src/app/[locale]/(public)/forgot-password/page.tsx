import { Metadata } from 'next';
import ForgotPasswordForm from '@/modules/auth/forgot-password/components/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Recuperar Conta | SMSillico',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
