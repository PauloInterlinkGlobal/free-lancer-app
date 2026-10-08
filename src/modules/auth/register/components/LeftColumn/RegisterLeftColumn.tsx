'use client';

import AnimatedStep from '@/core/components/AnimatedStep/AnimatedStep';
import RegisterLeftInfo from './RegisterLeftInfo';
import RegisterLeftPassword from './RegisterLeftPassword';

interface RegisterLeftColumnProps {
  step: 'info' | 'password';
  direction: number;
}

export default function RegisterLeftColumn({
  step,
  direction,
}: RegisterLeftColumnProps) {
  return (
    <div className="flex flex-col">
      <AnimatedStep stepKey={step} direction={direction}>
        {step === 'info' ? <RegisterLeftInfo /> : <RegisterLeftPassword />}
      </AnimatedStep>
    </div>
  );
}
