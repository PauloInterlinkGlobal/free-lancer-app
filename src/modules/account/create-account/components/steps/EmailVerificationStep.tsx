'use client';

import { Button } from '@/core/components/Button';
import { useToastStore } from '@/core/store';
import { ArrowLeft, ArrowRight, MailCheck } from 'lucide-react';
import { useState } from 'react';
import { useCreateAccountStore } from '../../store/useCreateAccountStore';
import { OtpInput } from '../OtpInput';

export function EmailVerificationStep() {
  const [isResending, setIsResending] = useState(false);
  const { formData, errors, isLoading, setField, nextStep, prevStep } =
    useCreateAccountStore();
  const { success } = useToastStore();

  const handleResendCode = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setField('emailCode', '');
      success('Novo código enviado para o seu e-mail!');
    }, 600);
  };

  const isCodeComplete = formData.emailCode?.length === 6;

  return (
    <div className="space-y-6 min-h-[380px] flex flex-col justify-between">
      <div>
        <div className="mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-primary text-primary dark:text-primary-400 text-xs font-semibold mb-4">
            <MailCheck className="w-3.5 h-3.5" />
            Tarefa 4 de 5: Confirmação de E-mail
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Verifique o seu endereço de e-mail
          </h1>
          <p className="mt-2 text-sm text-text-muted leading-relaxed">
            Enviámos um código de verificação de 6 dígitos para o endereço{' '}
            <strong className="text-text-primary font-semibold">
              {formData.corporateEmail || 'seu e-mail empresarial'}
            </strong>
            .
          </p>
        </div>

        <OtpInput
          value={formData.emailCode}
          onChange={(code) => setField('emailCode', code)}
          onComplete={() => nextStep()}
          error={errors.emailCode}
          isLoading={isLoading}
          loadingText="A validar o código e a processar a próxima etapa..."
          successText="Código completo! A avançar..."
          onResend={handleResendCode}
          isResending={isResending}
          resendText="Reenviar código"
        />
      </div>

      <div className="pt-6 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={prevStep}
          disabled={isLoading}
          leftIcon={ArrowLeft}
        >
          Voltar aos Contactos
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => nextStep()}
          isLoading={isLoading}
          disabled={!isCodeComplete}
          rightIcon={ArrowRight}
        >
          Confirmar e Avançar
        </Button>
      </div>
    </div>
  );
}

export default EmailVerificationStep;
