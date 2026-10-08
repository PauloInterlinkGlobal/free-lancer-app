import { Metadata } from 'next';
import { CreateCompanyForm } from '@/modules/account/create-account/components/CreateCompanyForm';

export const metadata: Metadata = {
  title: 'Registo da Empresa | SMSillico',
};

export default function CreateAccountPage() {
  return <CreateCompanyForm />;
}
