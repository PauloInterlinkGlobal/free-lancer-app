'use client';

import AnimatedStep from '@/core/components/AnimatedStep/AnimatedStep';
import { AuthCardLayout } from '@/core/components/Auth';
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm';
import ForgotStepContent from './ForgotStepContent';
import ForgotLeftColumn from './LeftColumn/ForgotLeftColumn';

export default function ForgotPasswordForm() {
  const form = useForgotPasswordForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.step === 'email') form.handleSendCode();
    else if (form.step === 'code') form.handleVerifyCode();
    else if (form.validateNewPassword()) {
      form.setIsLoading(true);
    }
  };

  return (
    <AuthCardLayout
      isLoading={form.isLoading}
      leftColumn={
        <ForgotLeftColumn
          step={form.step}
          direction={form.direction}
          email={form.email}
        />
      }
      rightColumn={
        <form onSubmit={handleSubmit} className="flex flex-col">
          <AnimatedStep stepKey={form.step} direction={form.direction}>
            <ForgotStepContent form={form} />
          </AnimatedStep>
        </form>
      }
    />
  );
}
