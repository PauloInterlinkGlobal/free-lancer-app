'use client';

import AnimatedStep from '@/core/components/AnimatedStep/AnimatedStep';
import LoginLeftEmail from './LoginLeftEmail';
import LoginLeftPassword from './LoginLeftPassword';

interface LoginLeftColumnProps {
  step: 'email' | 'password';
  direction: number;
  email: string;
  onBack: () => void;
}

export default function LoginLeftColumn({
  step,
  direction,
  email,
  onBack,
}: LoginLeftColumnProps) {
  return (
    <div className="flex flex-col">
      <AnimatedStep stepKey={step} direction={direction}>
        {step === 'email' ? (
          <LoginLeftEmail />
        ) : (
          <LoginLeftPassword email={email} onBack={onBack} />
        )}
      </AnimatedStep>
    </div>
  );
}
