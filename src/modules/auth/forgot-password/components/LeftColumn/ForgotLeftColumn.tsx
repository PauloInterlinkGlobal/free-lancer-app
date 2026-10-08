'use client';

import AnimatedStep from '@/core/components/AnimatedStep/AnimatedStep';
import ForgotLeftEmail from './ForgotLeftEmail';
import ForgotLeftCode from './ForgotLeftCode';
import ForgotLeftNewPassword from './ForgotLeftNewPassword';

interface ForgotLeftColumnProps {
  step: 'email' | 'code' | 'newPassword';
  direction: number;
  email: string;
}

export default function ForgotLeftColumn({
  step,
  direction,
  email,
}: ForgotLeftColumnProps) {
  return (
    <div className="flex flex-col">
      <AnimatedStep stepKey={step} direction={direction}>
        {step === 'email' && <ForgotLeftEmail />}
        {step === 'code' && <ForgotLeftCode email={email} />}
        {step === 'newPassword' && <ForgotLeftNewPassword />}
      </AnimatedStep>
    </div>
  );
}
