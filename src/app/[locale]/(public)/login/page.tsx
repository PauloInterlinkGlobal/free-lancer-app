import { Metadata } from 'next';
import LoginForm from '@/modules/auth/login/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login | SMSillico',
};

export default function LoginPage() {
  return <LoginForm />;
}
