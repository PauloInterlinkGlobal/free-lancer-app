'use client';

import { Input } from '@/core/components/Input';
import { useRouter } from '@/core/i18n/navigation';
import {
  MIN_AMOUNT,
  formatAmount,
  methodLabel,
} from '@/modules/payments/constants/payments';
import { PaymentMethod } from '@/modules/payments/interfaces/payments';
import { ArrowRight, Landmark } from 'lucide-react';
import { useState } from 'react';

const generateReference = () =>
  `PAG-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;

const QUICK_AMOUNTS = [1000, 5000, 10000, 50000];

const steps = [
  'Escolha o método e o valor',
  'Faça a transferência bancária',
  'Envie o comprovativo',
];

export function PaymentMethodStepClient() {
  const router = useRouter();

  const [method, setMethod] = useState<PaymentMethod>('transfer');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const value = Number(amount) || 0;

  const handleContinue = () => {
    if (!value || value < MIN_AMOUNT) {
      setError(`O volume mínimo é ${formatAmount(MIN_AMOUNT)}.`);
      return;
    }

    if (method !== 'transfer') return;

    const reference = generateReference();
    console.log('Criar pedido', { method, amount: value, reference });

    router.push(`/payments/top-up/${reference}?amount=${value}`);
  };

  const formatDigits = (raw: string) =>
    raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
      <div className="flex flex-col gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-base font-semibold text-primary-content">
            Método de pagamento
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled
              className="flex cursor-not-allowed items-center gap-3 rounded-xl bg-surface-raised p-4 opacity-60"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface text-muted-content">
                <img
                  src="/images/paypay-logo.png"
                  alt="logoPaypay"
                  className="w-12 h-4"
                  aria-hidden
                />
              </span>

              <div className="flex flex-col items-start gap-0.5">
                <span className="text-sm font-medium text-primary-content">
                  {methodLabel.paypay}
                </span>
                <span className="rounded-md px-1.5 py-0.5 text-[10px] font-medium text-muted-content">
                  Brevemente
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMethod('transfer')}
              aria-pressed={method === 'transfer'}
              className="flex items-center gap-3 rounded-xl bg-primary/10 p-4 ring-2 ring-primary transition-colors"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center text-primary">
                <Landmark size={20} aria-hidden />
              </span>

              <div className="flex flex-col items-start gap-0.5">
                <span className="text-sm font-medium text-primary-content">
                  {methodLabel.transfer}
                </span>
                <span className="text-xs text-muted-content">
                  Bancária, com comprovativo
                </span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-base font-semibold text-primary-content">
            Volume a carregar
          </h2>

          <div className="flex flex-col gap-1">
            <Input
              type="text"
              inputMode="numeric"
              autoComplete="off"
              label="Volume (SMS)"
              placeholder={`Mínimo ${formatDigits(String(MIN_AMOUNT))}`}
              value={formatDigits(amount)}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, '');
                setAmount(digits);
                setError('');
              }}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((quick) => (
              <button
                key={quick}
                type="button"
                onClick={() => {
                  setAmount(String(quick));
                  setError('');
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  value === quick
                    ? 'bg-primary text-white'
                    : 'bg-surface-raised text-muted-content hover:text-primary-content'
                }`}
              >
                {formatAmount(quick)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Direita: resumo e acção */}
      <div className="flex flex-col justify-between gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5">
          <div className="rounded-xl bg-surface-raised p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-content">
              Total de SMS a carregar
            </p>
            <p className="mt-1 text-3xl font-bold text-primary-content">
              {formatAmount(value)}
            </p>
            <p className="mt-1 text-xs text-muted-content">
              Método: {methodLabel[method]}
            </p>
          </div>

          <ol className="flex list-none flex-col p-0">
            {steps.map((step, index) => (
              <li
                key={step}
                className="relative flex items-start gap-3 pb-4 last:pb-0"
              >
                {index < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-3 top-7 h-[calc(100%-1.75rem)] w-px -translate-x-1/2 bg-primary/20"
                  />
                )}

                <span
                  className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    index === 0
                      ? 'bg-primary text-white'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  {index + 1}
                </span>

                <p
                  className={`pt-0.5 text-sm ${
                    index === 0
                      ? 'font-semibold text-primary-content'
                      : 'text-muted-content'
                  }`}
                >
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleContinue}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Continuar
            <ArrowRight size={16} aria-hidden />
          </button>

          <button
            type="button"
            onClick={() => router.push('/payments')}
            className="w-full rounded-xl px-5 py-2.5 text-sm font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
