'use client';

import { useRouter } from '@/core/i18n/navigation';
import AnimatedStep from '@/core/components/AnimatedStep/AnimatedStep';
import { AuthCardLayout } from '@/core/components/Auth';
import { useRegisterForm } from '../hooks/useRegisterForm';
import RegisterLeftColumn from './LeftColumn/RegisterLeftColumn';
import RegisterStepContent from './RegisterStepContent';

export default function RegisterForm() {
  const router = useRouter();
  const form = useRegisterForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.step === 'info') {
      form.handleNext();
      return;
    }
    if (!form.validatePassword()) return;
    form.setIsLoading(true);
    setTimeout(() => {
      form.setIsLoading(false);
      router.push('/create-account');
    }, 600);
  };

  return (
    <AuthCardLayout
      isLoading={form.isLoading}
      leftColumn={
        <RegisterLeftColumn step={form.step} direction={form.direction} />
      }
      rightColumn={
        <form onSubmit={handleSubmit} className="flex flex-col">
          <AnimatedStep stepKey={form.step} direction={form.direction}>
            <RegisterStepContent form={form} />
          </AnimatedStep>
        </form>
      }
    />
  );
}
