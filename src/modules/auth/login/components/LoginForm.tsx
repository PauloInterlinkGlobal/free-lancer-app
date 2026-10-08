'use client';

import AnimatedStep from '@/core/components/AnimatedStep/AnimatedStep';
import { AuthCardLayout } from '@/core/components/Auth';
import { useLoginForm } from '../hooks/useLoginForm';
import LoginLeftColumn from './LeftColumn/LoginLeftColumn';
import LoginStepContent from './LoginStepContent';

export default function LoginForm() {
  const form = useLoginForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.step === 'email') {
      form.handleNextStep();
      return;
    }
    if (!form.password) {
      form.setPasswordError('Introduza a sua palavra-passe.');
      form.passwordRef.current?.focus();
      return;
    }
    form.setPasswordError('');
    form.setIsLoading(true);
  };

  const left = (
    <LoginLeftColumn
      step={form.step}
      direction={form.direction}
      email={form.email}
      onBack={form.handleBack}
    />
  );

  const right = (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <AnimatedStep stepKey={form.step} direction={form.direction}>
        <LoginStepContent form={form} />
      </AnimatedStep>
    </form>
  );

  return (
    <AuthCardLayout
      isLoading={form.isLoading}
      leftColumn={left}
      rightColumn={right}
    />
  );
}
