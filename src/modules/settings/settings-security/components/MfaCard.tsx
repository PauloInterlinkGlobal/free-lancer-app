'use client';

import {
  CheckCircle2,
  Mail,
  MessageSquareText,
  ShieldCheck,
  ShieldOff,
  Smartphone,
} from 'lucide-react';

interface MfaCardProps {
  enabled?: boolean;
}

const METHODS = [
  {
    icon: Smartphone,
    title: 'Aplicação autenticadora',
    description: 'Google Authenticator, Authy ou Microsoft Authenticator.',
    recommended: true,
  },
  {
    icon: MessageSquareText,
    title: 'Mensagem SMS',
    description: 'Receba um código no seu telemóvel a cada início de sessão.',
    recommended: false,
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'Receba um código no seu email a cada início de sessão.',
    recommended: false,
  },
];

const BENEFITS = [
  'Protege a conta mesmo que a palavra-passe seja descoberta',
  'Bloqueia acessos não autorizados de dispositivos desconhecidos',
  'Pode ser desativado a qualquer momento',
];

export function MfaCard({ enabled = false }: MfaCardProps) {
  const handleConfigure = () => {
    console.log('Configurar MFA');
  };

  const handleDisable = () => {
    console.log('Desativar MFA');
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center  text-primary">
            <ShieldCheck size={24} aria-hidden />
          </span>

          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
              Autenticação de dois fatores
            </h2>

            <p className="mt-1 text-sm text-muted-content">
              Adicione uma camada extra de segurança à sua conta.
            </p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            enabled
              ? 'bg-emerald-500/10 text-emerald-600'
              : 'bg-red-500/10 text-red-500'
          }`}
        >
          {enabled ? (
            <CheckCircle2 size={12} aria-hidden />
          ) : (
            <ShieldOff size={12} aria-hidden />
          )}
          {enabled ? 'Ativo' : 'Desativado'}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-primary-content">
          Métodos disponíveis
        </span>

        <ul className="flex flex-col gap-2">
          {METHODS.map(({ icon: Icon, title, description, recommended }) => (
            <li
              key={title}
              className="flex items-center gap-3 rounded-xl border border-border-ui p-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-icon-bg text-primary">
                <Icon size={18} aria-hidden />
              </span>

              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold text-primary-content">
                  {title}
                  {recommended && (
                    <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      Recomendado
                    </span>
                  )}
                </p>

                <p className="text-xs text-muted-content">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Benefícios */}
      <ul className="flex flex-col gap-2">
        {BENEFITS.map((benefit) => (
          <li
            key={benefit}
            className="flex items-start gap-2 text-sm text-muted-content"
          >
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-primary"
              aria-hidden
            />
            {benefit}
          </li>
        ))}
      </ul>

      <div className="flex justify-end border-t border-divider pt-4">
        {enabled ? (
          <button
            type="button"
            onClick={handleDisable}
            className="rounded-xl border border-red-500/30 px-5 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10"
          >
            Desativar
          </button>
        ) : (
          <button
            type="button"
            onClick={handleConfigure}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Configurar
          </button>
        )}
      </div>
    </div>
  );
}
