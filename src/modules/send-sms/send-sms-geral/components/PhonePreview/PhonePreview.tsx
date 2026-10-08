'use client';

import {
  ArrowLeft,
  BatteryFull,
  CheckCheck,
  ChevronLeft,
  Info,
  Mic,
  Moon,
  Plus,
  Signal,
  Sun,
  Wifi,
} from 'lucide-react';
import { useState } from 'react';

export interface PhonePreviewProps {
  senderName?: string;
  senderSubtitle?: string;
  message?: string;
  time?: string;
  /** Resposta de exemplo. Se não for passada, não aparece. */
  replyText?: string;
  replyTime?: string;
  /** Nº de SMS da mensagem (para a etiqueta por baixo da bolha) */
  segments?: number;
  type?: 'normal' | 'flash';
  className?: string;
}

type Device = 'ios' | 'android';

function shiftTime(hhmm: string | undefined, minutes: number) {
  const match = hhmm?.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return undefined;
  const total =
    (Number(match[1]) * 60 + Number(match[2]) + minutes + 1440) % 1440;
  const h = String(Math.floor(total / 60)).padStart(2, '0');
  const m = String(total % 60).padStart(2, '0');
  return `${h}:${m}`;
}

function TypingDots() {
  return (
    <span className="flex h-5 items-center gap-1" aria-label="A escrever">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{ animationDelay: `${i * 150}ms` }}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-content/70"
        />
      ))}
    </span>
  );
}

function Toggle<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; icon?: React.ReactNode }[];
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex rounded-lg border border-border-ui bg-surface p-0.5"
    >
      {options.map((o) => {
        const active = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={o.label}
            onClick={() => onChange(o.value)}
            className={`inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors ${
              active
                ? 'bg-primary text-white'
                : 'text-muted-content hover:bg-item-hover hover:text-primary-content'
            }`}
          >
            {o.icon}
            {o.icon ? null : o.label}
          </button>
        );
      })}
    </div>
  );
}

export function PhonePreview({
  senderName = 'Remetente',
  senderSubtitle = 'Conta Business',
  message,
  time,
  replyText,
  replyTime,
  segments,
  type = 'normal',
  className = '',
}: PhonePreviewProps) {
  const [device, setDevice] = useState<Device>('ios');
  const [dark, setDark] = useState(false);

  const isIos = device === 'ios';
  const initials = senderName.trim().slice(0, 2).toUpperCase() || '??';
  const hasMessage = Boolean(message?.trim());
  const isFlash = type === 'flash';
  const separatorTime = shiftTime(time, -1);
  const answerTime = replyTime ?? shiftTime(time, 2);

  return (
    <div className={`flex h-full flex-col items-center gap-3 ${className}`}>
      {/* Controlos */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Toggle
          label="Sistema do telemóvel"
          value={device}
          onChange={setDevice}
          options={[
            { value: 'ios', label: 'iOS' },
            { value: 'android', label: 'Android' },
          ]}
        />
        <Toggle
          label="Tema do ecrã"
          value={dark ? 'dark' : 'light'}
          onChange={(v) => setDark(v === 'dark')}
          options={[
            { value: 'light', label: 'Claro', icon: <Sun size={14} /> },
            { value: 'dark', label: 'Escuro', icon: <Moon size={14} /> },
          ]}
        />
      </div>

      {/* Telemóvel */}
      <div
        role="img"
        aria-label="Pré-visualização da mensagem no telemóvel"
        className="min-h-0 w-full max-w-[300px] flex-1"
      >
        <div
          className={`relative h-full overflow-hidden border-[8px] border-slate-900 shadow-[0_24px_50px_-18px_rgb(var(--color-primary)/0.45)] dark:border-slate-600 ${
            isIos ? 'rounded-[2.75rem]' : 'rounded-[2rem]'
          }`}
        >
          <div
            className={`${dark ? 'dark' : ''} relative flex h-[clamp(480px,calc(100dvh-14rem),600px)] flex-col bg-surface text-primary-content`}
          >
            {isIos ? (
              <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
            ) : (
              <div className="absolute left-1/2 top-2.5 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-black" />
            )}

            <div className="flex h-9 shrink-0 items-end justify-between px-6 pb-1 text-[11px] font-semibold text-primary-content">
              <span>{time || '--:--'}</span>
              <span className="flex items-center gap-1">
                <Signal size={12} aria-hidden />
                <Wifi size={12} aria-hidden />
                <BatteryFull size={14} aria-hidden />
              </span>
            </div>

            {/* Cabeçalho */}
            {isIos ? (
              <div className="relative flex shrink-0 flex-col items-center border-b border-ui bg-surface px-3 pb-2 pt-1">
                <ChevronLeft
                  size={22}
                  className="absolute left-2 top-2 text-primary"
                  aria-hidden
                />
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {initials}
                </div>
                <p className="mt-1 max-w-[180px] truncate text-[11px] font-medium text-primary-content">
                  {senderName}
                </p>
              </div>
            ) : (
              <div className="flex shrink-0 items-center gap-2.5 border-b border-ui bg-surface px-3 pb-2.5 pt-1">
                <ArrowLeft
                  size={18}
                  className="shrink-0 text-muted-content"
                  aria-hidden
                />
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  {initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold leading-tight text-primary-content">
                    {senderName}
                  </p>
                  <p className="truncate text-xs text-muted-content">
                    {senderSubtitle}
                  </p>
                </div>
                <Info
                  size={18}
                  className="shrink-0 text-muted-content"
                  aria-hidden
                />
              </div>
            )}

            {/* Conversa */}
            <div
              className={`flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden px-3 py-4 ${
                isIos ? 'bg-surface' : 'bg-item-hover'
              }`}
              style={
                isIos
                  ? undefined
                  : {
                      backgroundImage:
                        'radial-gradient(rgb(var(--color-border-ui) / 0.6) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }
              }
            >
              <p className="pb-1 text-center text-[11px] font-medium text-muted-content">
                {isIos ? 'SMS · ' : ''}Hoje
                {separatorTime ? ` ${separatorTime}` : ''}
              </p>

              {/* Bolha recebida */}
              <div className="flex min-w-0 max-w-[85%] flex-col items-start gap-1">
                <div
                  className={`min-w-0 max-w-full px-3.5 py-2 ${
                    isIos
                      ? 'rounded-[1.1rem] rounded-bl-md bg-surface-subtle'
                      : 'rounded-2xl rounded-tl-sm border border-ui bg-surface shadow-sm'
                  }`}
                >
                  {hasMessage ? (
                    <p className="whitespace-pre-wrap text-sm text-primary-content [overflow-wrap:anywhere]">
                      {message}
                    </p>
                  ) : (
                    <TypingDots />
                  )}
                </div>

                {hasMessage && (
                  <p className="px-1 text-[10px] text-muted-content">
                    {time}
                    {segments
                      ? ` · ${segments} SMS · ${message?.length ?? 0} caracteres`
                      : ''}
                  </p>
                )}
              </div>

              {/* Bolha de resposta */}
              {replyText && (
                <div
                  className={`ml-auto min-w-0 max-w-[85%] bg-primary px-3.5 py-2 text-white ${
                    isIos
                      ? 'rounded-[1.1rem] rounded-br-md'
                      : 'rounded-2xl rounded-tr-sm shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm [overflow-wrap:anywhere]">
                    {replyText}
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px]">
                    {answerTime && (
                      <span className="opacity-80">{answerTime}</span>
                    )}
                    <CheckCheck size={14} aria-hidden />
                  </div>
                </div>
              )}
            </div>

            {/* Barra de escrita */}
            <div className="flex shrink-0 items-center gap-2 border-t border-ui bg-surface px-3 py-2.5">
              <Plus
                size={20}
                className="shrink-0 text-muted-content"
                aria-hidden
              />
              <div className="flex-1 rounded-full border border-ui bg-surface px-3.5 py-2 text-xs text-muted-content">
                {isIos ? 'Mensagem de texto · SMS' : 'Mensagem de texto'}
              </div>
              <Mic
                size={18}
                className="shrink-0 text-muted-content"
                aria-hidden
              />
            </div>

            {/* Flash */}
            {isFlash && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 px-6 backdrop-blur-md">
                <div
                  className={`w-full overflow-hidden bg-surface/90 text-center shadow-2xl backdrop-blur-xl ${
                    isIos ? 'rounded-2xl' : 'rounded-3xl'
                  }`}
                >
                  <div className="px-4 pb-4 pt-5">
                    <p className="truncate text-base font-semibold text-primary-content">
                      {senderName}
                    </p>
                    {hasMessage ? (
                      <p className="mt-1 max-h-40 overflow-y-auto whitespace-pre-wrap text-sm text-primary-content [overflow-wrap:anywhere]">
                        {message}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm italic text-muted-content">
                        A sua mensagem flash aparecerá aqui
                      </p>
                    )}
                  </div>
                  <div className="border-t border-ui py-3 text-base font-semibold text-primary">
                    OK
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhonePreview;
