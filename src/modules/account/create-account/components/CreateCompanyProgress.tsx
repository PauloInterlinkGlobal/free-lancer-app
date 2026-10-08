'use client';

import { Check } from 'lucide-react';
import { useCreateAccountStore } from '../store/useCreateAccountStore';

const STEPS = [
  { step: 1, label: 'Empresa' },
  { step: 2, label: 'Endereço' },
  { step: 3, label: 'Contactos' },
  { step: 4, label: 'E-mail' },
  { step: 5, label: 'Telefone' },
  { step: 6, label: 'Ativação' },
];

export function CreateCompanyProgress() {
  const currentStep = useCreateAccountStore((state) => state.currentStep);

  return (
    <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-4 pb-4 mb-12 bg-background/95 border-b border-border-ui/40 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        {/* Desktop Step Indicators (6 Steps) */}
        <div className="hidden sm:grid sm:grid-cols-6 gap-3 sm:gap-4 text-xs font-medium mb-3.5">
          {STEPS.map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;

            return (
              <div
                key={s.step}
                className={`flex flex-col items-center text-center transition-colors ${
                  isCurrent || isCompleted
                    ? 'text-primary font-semibold'
                    : 'text-text-muted'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                      isCompleted || isCurrent
                        ? 'bg-primary text-white shadow-sm shadow-primary/30'
                        : 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.step}
                  </span>
                  <span className="truncate">{s.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Step Indicator */}
        <div className="flex sm:hidden items-center justify-between text-xs font-medium text-text-muted mb-2">
          <span className="flex items-center gap-2 font-semibold text-primary">
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] bg-primary text-white font-bold">
              {currentStep}
            </span>
            <span>{STEPS[currentStep - 1]?.label}</span>
          </span>
          <span className="text-xs text-text-muted">
            Etapa {currentStep} de 6
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateCompanyProgress;
