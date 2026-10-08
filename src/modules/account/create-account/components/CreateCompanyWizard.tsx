'use client';

import AnimatedStep from '@/core/components/AnimatedStep/AnimatedStep';
import { useCreateAccountStore } from '../store/useCreateAccountStore';
import { CreateCompanyProgress } from './CreateCompanyProgress';
import { CompanyAddressStep } from './steps/CompanyAddressStep';
import { CompanyContactsStep } from './steps/CompanyContactsStep';
import { CompanyDataStep } from './steps/CompanyDataStep';
import { EmailVerificationStep } from './steps/EmailVerificationStep';
import { PhoneVerificationStep } from './steps/PhoneVerificationStep';

export function CreateCompanyWizard() {
  const currentStep = useCreateAccountStore((state) => state.currentStep);
  const direction = useCreateAccountStore((state) => state.direction);

  return (
    <div className="w-full">
      <CreateCompanyProgress />

      <div className="bg-surface rounded-2xl border border-border-ui shadow-sm p-6 sm:p-10 min-h-[500px] flex flex-col">
        <AnimatedStep stepKey={String(currentStep)} direction={direction}>
          {currentStep === 1 && <CompanyDataStep />}
          {currentStep === 2 && <CompanyAddressStep />}
          {currentStep === 3 && <CompanyContactsStep />}
          {currentStep === 4 && <EmailVerificationStep />}
          {currentStep === 5 && <PhoneVerificationStep />}
        </AnimatedStep>
      </div>
    </div>
  );
}

export default CreateCompanyWizard;
