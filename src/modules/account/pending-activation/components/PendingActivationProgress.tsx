'use client';

import { Check } from 'lucide-react';
import { AccountActivationStatus } from '../interfaces/pending-activation';

interface PendingActivationProgressProps {
  status: AccountActivationStatus;
}

const STEPS = [
  { step: 1, label: 'Empresa', description: 'Nome, NIF e Sector' },
  { step: 2, label: 'Endereço', description: 'Rua, Bairro e Cidade' },
  { step: 3, label: 'Contactos', description: 'E-mail, Telefone e Web' },
  { step: 4, label: 'Validar E-mail', description: 'Código de Confirmação' },
  { step: 5, label: 'Validar Telefone', description: 'Código SMS' },
  { step: 6, label: 'Estado', description: 'Validação & Acesso' },
];

export function PendingActivationProgress({
  status,
}: PendingActivationProgressProps) {
  const isApproved = status === 'approved';

  return (
    <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 pt-4 pb-4 mb-6 bg-background/95 backdrop-blur-sm border-b border-border-ui/40">
      <div className="max-w-3xl mx-auto">
        {/* Desktop Step Indicators (6 Steps) */}
        <div className="hidden sm:grid sm:grid-cols-6 gap-2 text-xs font-medium mb-3">
          {STEPS.map((s) => {
            const isCompleted = s.step < 6 || (s.step === 6 && isApproved);
            const isCurrent = s.step === 6 && !isApproved;

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
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
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
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white bg-primary">
              {isApproved ? <Check className="w-3.5 h-3.5" /> : 6}
            </span>
            <span>
              {isApproved ? 'Aprovado com Sucesso' : 'Estado do Cadastro'}
            </span>
          </span>
          <span className="text-xs text-text-muted">Etapa 6 de 6</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full w-full rounded-full transition-all duration-500 ease-out bg-primary" />
        </div>
      </div>
    </div>
  );
}

export default PendingActivationProgress;
