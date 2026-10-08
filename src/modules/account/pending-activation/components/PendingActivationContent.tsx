'use client';

import { Button } from '@/core/components/Button';
import { useRouter } from '@/core/i18n/navigation';
import { useToastStore } from '@/core/store';
import {
  AlertCircle,
  ArrowRight,
  Building,
  CheckCircle2,
  Clock,
  LogOut,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { usePendingActivation } from '../hooks/usePendingActivation';
import { PendingActivationProgress } from './PendingActivationProgress';

export function PendingActivationContent() {
  const router = useRouter();
  const { success, error, showToast } = useToastStore();
  const {
    status,
    isChecking,
    checkStatus,
    simulateApproval,
    simulateRejection,
  } = usePendingActivation('pending');

  const handleCheckStatus = () => {
    checkStatus();
    showToast('A auditoria de conformidade continua em análise.', 'success');
  };

  const handleSimulateApprove = () => {
    simulateApproval();
    success('Cadastro aprovado com sucesso!');
  };

  const handleSimulateReject = () => {
    simulateRejection();
  };

  const handleGoToDashboard = () => {
    success('Acesso autorizado! Bem-vindo ao painel.');
    router.push('/dashboard');
  };

  const handleGoToLoginWithRejection = () => {
    error('O cadastro não foi concluído. Tente novamente.');
    router.push('/login');
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-12 px-4 sm:px-6">
      <PendingActivationProgress status={status} />

      <div className="bg-surface rounded-2xl border border-border-ui shadow-sm p-6 sm:p-10 transition-all">
        {status === 'pending' && (
          <div className="text-center py-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Cadastro em Análise e Validação
            </h1>
            <p className="mt-3 text-sm text-text-muted max-w-lg mx-auto leading-relaxed">
              Obrigado por submeter os dados da sua empresa. Os seus dados de
              contacto foram validados com sucesso e a nossa equipa está a
              auditar as informações junto das operadoras.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-surface-raised border border-border-ui">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-primary mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Contactos Validados
                </div>
                <p className="text-xs text-text-muted">
                  E-mail e telefone empresarial confirmados.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-raised border border-border-ui">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-primary mb-1">
                  <Building className="w-4 h-4 text-primary-500" />
                  Auditoria de NIF
                </div>
                <p className="text-xs text-text-muted">
                  Conferência fiscal e conformidade legal.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-raised border border-border-ui">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-primary mb-1">
                  <Clock className="w-4 h-4 text-amber-500" />
                  Tempo Estimado
                </div>
                <p className="text-xs text-text-muted">
                  Aprovação geralmente em menos de 2 horas úteis.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={handleCheckStatus}
                isLoading={isChecking}
                leftIcon={RefreshCw}
                className="w-full sm:w-auto"
              >
                Atualizar Estado
              </Button>

              <Button
                variant="primary"
                size="md"
                onClick={handleSimulateApprove}
                rightIcon={CheckCircle2}
                className="w-full sm:w-auto !bg-emerald-600 hover:!bg-emerald-700"
              >
                Simular Aprovação
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={handleSimulateReject}
                rightIcon={AlertCircle}
                className="w-full sm:w-auto text-red-600 hover:text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/40"
              >
                Simular Rejeição
              </Button>
            </div>
          </div>
        )}

        {status === 'approved' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 text-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-2">
              Cadastro Aprovado
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Parabéns! A sua empresa foi ativada
            </h1>
            <p className="mt-3 text-sm text-text-muted max-w-lg mx-auto leading-relaxed">
              Todos os dados foram validados pelas operadoras. A sua conta tem
              agora acesso total ao envio de SMS e à plataforma SMSillico.
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                size="md"
                variant="primary"
                onClick={handleGoToDashboard}
                rightIcon={ArrowRight}
                className="w-full sm:w-auto !px-8 shadow-lg shadow-primary-500/20"
              >
                Aceder ao Dashboard
              </Button>
            </div>
          </div>
        )}

        {status === 'rejected' && (
          <div className="text-center py-4">
            <div className="w-16 h-16 text-red-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-red-600 dark:text-red-400 text-xs font-semibold mb-4">
              Cadastro Não Concluído
            </span>

            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Registo da Empresa Recusado
            </h1>
            <p className="mt-3 text-sm text-text-muted max-w-lg mx-auto leading-relaxed">
              Não foi possível validar o NIF ou as informações fiscais da
              empresa. Por favor, tente novamente a partir da tela de login.
            </p>

            <div className="mt-8 flex justify-center">
              <Button
                variant="ghost"
                size="md"
                onClick={handleGoToLoginWithRejection}
                leftIcon={LogOut}
                className="w-full sm:w-auto"
              >
                Voltar ao Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingActivationContent;
