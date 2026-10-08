import { Link } from '@/core/i18n/navigation';
import {
  MIN_AMOUNT,
  formatAmount,
} from '@/modules/payments/constants/payments';
import { ArrowRight, Clock, Wallet } from 'lucide-react';

interface TopUpCardProps {
  pendingCount: number;
}

const steps = [
  { title: 'Escolha o valor', description: 'Indique quanto quer carregar.' },
  {
    title: 'Faça a transferência',
    description: 'Use as coordenadas bancárias.',
  },
  {
    title: 'Envie o comprovativo',
    description: 'Validamos e creditamos a sua conta.',
  },
];

export function TopUpCard({ pendingCount }: TopUpCardProps) {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6 lg:grid-cols-[1.6fr_1fr]">
      {/* Esquerda: contexto */}
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center text-primary">
            <Wallet size={24} aria-hidden />
          </span>

          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              Pagamentos
            </span>

            <h2 className="mt-0.5 text-lg font-bold leading-tight text-primary-content md:text-xl">
              Carregue a sua conta
            </h2>

            <p className="mt-1 text-sm text-muted-content">
              Faça um pagamento por transferência bancária e continue a enviar
              SMS sem interrupções.
            </p>
          </div>
        </div>

        <ol className="flex list-none flex-col p-0">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative flex items-start gap-3 pb-5 last:pb-0"
            >
              {/* Linha a ligar ao passo seguinte */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-3 top-8 h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-primary/20"
                />
              )}

              <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                {index + 1}
              </span>

              <div className="min-w-0 pt-0.5">
                <p className="text-sm font-semibold leading-tight text-primary-content">
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-content">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Direita: acção */}
      <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-raised p-4 md:p-5">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-content">
              Valor mínimo
            </p>
            <p className="text-2xl font-bold text-primary-content">
              {formatAmount(MIN_AMOUNT)}
            </p>
          </div>

          {pendingCount > 0 && (
            <div className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-3">
              <Clock
                size={16}
                aria-hidden
                className="mt-0.5 shrink-0 text-amber-500"
              />

              <div className="flex flex-col gap-1">
                <p className="text-xs font-medium text-amber-500">
                  {pendingCount === 1
                    ? '1 pagamento à espera de comprovativo'
                    : `${pendingCount} pagamentos à espera de comprovativo`}
                </p>
                <Link
                  href="/payments?status=pending"
                  className="w-fit text-xs font-semibold text-amber-500 underline-offset-2 hover:underline"
                >
                  Ver pendentes
                </Link>
              </div>
            </div>
          )}
        </div>

        <Link
          href="/payments/top-up"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Carregar conta
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
