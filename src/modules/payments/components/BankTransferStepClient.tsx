'use client';

import { useRouter } from '@/core/i18n/navigation';
import {
  bankDetails,
  formatAmount,
} from '@/modules/payments/constants/payments';
import { Check, Copy, FileUp, Info, Landmark } from 'lucide-react';

import { useRef, useState } from 'react';
import { PaymentSuccess } from './PaymentSuccess';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED = ['application/pdf', 'image/jpeg', 'image/png'];

interface BankTransferStepProps {
  reference: string;
  amount: number;
}

export function BankTransferStepClient({
  reference,
  amount,
}: BankTransferStepProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [transferReference, setTransferReference] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const rows = [
    { label: 'Banco', value: bankDetails.bank },
    { label: 'Titular', value: bankDetails.holder },
    { label: 'IBAN', value: bankDetails.iban, copyable: true },
    { label: 'Referência do pedido', value: reference, copyable: true },
  ];

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(''), 1500);
    } catch {}
  };

  const handleFile = (selected: File | undefined) => {
    if (!selected) return;

    if (!ACCEPTED.includes(selected.type)) {
      setError('Formato inválido. Use PDF, JPG ou PNG.');
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError('O ficheiro excede 5 MB.');
      return;
    }

    setError('');
    setFile(selected);
  };

  const handleSubmit = () => {
    if (!file) {
      setError('Anexe o comprovativo da transferência.');
      return;
    }

    console.log('Enviar comprovativo', {
      reference,
      file: file.name,
    });

    router.refresh();
    setSubmitted(true);
  };

  if (submitted) {
    return <PaymentSuccess reference={reference} amount={amount} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
      {/* Esquerda: coordenadas bancárias */}
      <div className="flex flex-col gap-5 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center text-primary">
            <Landmark size={24} aria-hidden />
          </span>

          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
              Dados para transferência
            </h2>
            <p className="mt-1 text-sm text-muted-content">
              Transfira o valor abaixo e use a referência do pedido na descrição
              da transferência.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-surface-raised p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-content">
            Volume a carregar
          </p>
          <p className="mt-1 text-3xl font-bold text-primary-content">
            {formatAmount(amount)}
          </p>
        </div>

        <dl className="flex flex-col divide-y divide-black/5">
          {rows.map(({ label, value, copyable }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 py-3 text-sm"
            >
              <dt className="shrink-0 text-muted-content">{label}</dt>

              <dd className="flex min-w-0 items-center gap-2">
                <span className="break-all text-right font-medium text-primary-content">
                  {value}
                </span>

                {copyable && (
                  <button
                    type="button"
                    aria-label={`Copiar ${label}`}
                    onClick={() => handleCopy(value)}
                    className="shrink-0 rounded-lg p-1.5 text-muted-content transition-colors hover:bg-item-hover hover:text-primary"
                  >
                    {copied === value ? (
                      <Check size={16} aria-hidden className="text-green-500" />
                    ) : (
                      <Copy size={16} aria-hidden />
                    )}
                  </button>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Direita: comprovativo */}
      <div className="flex flex-col justify-between gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-semibold text-primary-content">
            Enviar comprovativo
          </h2>
          <div
            role="note"
            className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900"
          >
            <Info size={20} aria-hidden className="mt-0.5 shrink-0" />

            <div className="min-w-0 text-sm">
              <p className="font-semibold">Não se esqueça da referência</p>

              <p className="mt-1 text-xs leading-relaxed">
                Ao fazer a transferência, coloque{' '}
                <span className="break-all font-mono text-sm font-bold">
                  {reference}
                </span>{' '}
                na descrição. Esta referência permite-nos identificar a sua
                transferência e associá-la ao pagamento correto.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center gap-1 rounded-xl border-2 border-dashed border-ui p-5 text-muted-content transition-colors hover:border-primary hover:text-primary"
          >
            <FileUp size={22} aria-hidden />
            <span className="max-w-full truncate text-sm font-medium">
              {file ? file.name : 'Anexar comprovativo'}
            </span>
            <span className="text-xs">PDF, JPG ou PNG, até 5 MB</span>
          </button>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Enviar comprovativo
          </button>

          <button
            type="button"
            onClick={() =>
              router.push(`/payments/${reference}?amount=${amount}`)
            }

            className="w-full rounded-xl px-5 py-2.5 text-sm font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            Fazer depois
          </button>
        </div>
      </div>
    </div>
  );
}
