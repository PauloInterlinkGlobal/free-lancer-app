'use client';

import { Button } from '@/core/components/Button';
import { useRouter } from '@/core/i18n/navigation';
import { useToastStore } from '@/core/store';
import { ArrowLeft, ArrowRight, MessageSquareCode } from 'lucide-react';
import { useState } from 'react';
import { useCreateAccountStore } from '../../store/useCreateAccountStore';
import { OtpInput } from '../OtpInput';

export function PhoneVerificationStep() {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const { formData, errors, isLoading, setField, nextStep, prevStep } =
    useCreateAccountStore();
  const { success } = useToastStore();

  const handleComplete = () => {
    nextStep(() => {
      success('Verificação concluída com sucesso!');
      router.push('/pending-activation');
    });
  };

  const handleResendSms = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setField('phoneCode', '');
      success('Novo código enviado para o seu telefone');
    }, 600);
  };

  const isCodeComplete = formData.phoneCode?.length === 6;

  return (
    <div className="space-y-6 min-h-[380px] flex flex-col justify-between">
      <div>
        <div className="mb-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-primary text-primary dark:text-primary-400 text-xs font-semibold mb-4">
            <MessageSquareCode className="w-3.5 h-3.5" />
            Tarefa 5 de 5: Confirmação de Telefone
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Verifique o seu número de telefone
          </h1>
          <p className="mt-2 text-sm text-text-muted leading-relaxed">
            Enviámos uma mensagem SMS com um código de validação para{' '}
            <strong className="text-text-primary font-semibold">
              {formData.phone || 'seu contacto telefónico'}
            </strong>
            .
          </p>
        </div>

        <OtpInput
          value={formData.phoneCode}
          onChange={(code) => setField('phoneCode', code)}
          onComplete={handleComplete}
          error={errors.phoneCode}
          isLoading={isLoading}
          loadingText="A validar o código e a concluir o registo..."
          successText="Código completo! A finalizar..."
          helpText="Não recebeu o SMS?"
          onResend={handleResendSms}
          isResending={isResending}
          resendText="Reenviar SMS"
        />
      </div>

      <div className="pt-6 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={prevStep}
          disabled={isLoading}
          leftIcon={ArrowLeft}
        >
          Voltar ao E-mail
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleComplete}
          isLoading={isLoading}
          disabled={!isCodeComplete}
          rightIcon={ArrowRight}
        >
          Concluir Registo
        </Button>
      </div>
    </div>
  );
}

export default PhoneVerificationStep;
