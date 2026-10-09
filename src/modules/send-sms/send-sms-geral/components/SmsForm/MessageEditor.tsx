'use client';

import { VariablesDropdown } from '@/core/components/VariablesDropdown';
import { contactsMock } from '@/modules/contacts/contacts-geral/mocks/contacts.mock';
import { collectCustomVariableKeys } from '@/modules/contacts/contacts-geral/utils/collectCustomVariableKeys';
import {
  getSmsInfo,
  removeAccents,
} from '@/modules/send-sms/send-sms-geral/sms-utils';
import { FlaskConical } from 'lucide-react';
import { useMemo, useRef } from 'react';

interface MessageEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSendTest?: () => void;
  testing?: boolean;
  customKeys?: string[];
}

function SegmentRing({
  progress,
  segments,
}: {
  progress: number;
  segments: number;
}) {
  const r = 16;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative h-10 w-10 shrink-0">
      <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="4"
          className="stroke-border-ui"
          style={{ stroke: 'rgb(var(--color-border-ui))' }}
        />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
          className="transition-[stroke-dashoffset] duration-200"
          style={{ stroke: 'rgb(var(--color-primary))' }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary-content">
        {segments}
      </span>
    </div>
  );
}

export function MessageEditor({
  value,
  onChange,
  onSendTest,
  testing,
  customKeys,
}: MessageEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const info = getSmsInfo(value);

  const availableCustomKeys = useMemo(
    () => customKeys ?? collectCustomVariableKeys(contactsMock),
    [customKeys]
  );

  // Poupança possível ao remover acentos
  const stripped = getSmsInfo(removeAccents(value));
  const canSaveByStripping =
    !info.isGsm && stripped.isGsm && stripped.segments < info.segments;

  function insertVariableToken(token: string) {
    const el = ref.current;
    if (!el) return onChange(value + token);

    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;
    onChange(value.slice(0, start) + token + value.slice(end));

    requestAnimationFrame(() => {
      el.focus();
      const pos = start + token.length;
      el.setSelectionRange(pos, pos);
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="sms-message"
          className="text-sm font-medium text-primary-content"
        >
          Mensagem
        </label>

        <div className="flex items-center gap-1.5">
          <VariablesDropdown
            onSelect={insertVariableToken}
            customKeys={availableCustomKeys}
          />
        </div>
      </div>

      <textarea
        id="sms-message"
        ref={ref}
        rows={7}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escreva a sua mensagem..."
        className="w-full resize-y rounded-lg border border-border-ui bg-surface px-3 py-2 text-sm text-primary-content outline-none transition-colors placeholder:text-muted-content focus:border-primary"
      />

      {/* Medidor */}
      <div className="flex items-center gap-3 rounded-xl bg-surface-raised px-3 py-2.5">
        <SegmentRing progress={info.progress} segments={info.segments} />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-primary-content">
            {info.segments === 0
              ? 'Escreva para ver o custo em SMS'
              : `${info.segments} SMS · ${info.length} caracteres`}
          </p>
          <p className="text-xs text-muted-content">
            {info.segments === 0
              ? 'GSM: 160 caracteres por SMS (70 com acentos especiais).'
              : `Faltam ${info.remaining} para o próximo SMS · limite ${info.limit}`}
          </p>
        </div>

        {onSendTest && (
          <button
            type="button"
            onClick={onSendTest}
            disabled={!value.trim() || testing}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border-ui bg-surface px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-item-hover disabled:pointer-events-none disabled:opacity-50"
          >
            <FlaskConical size={14} aria-hidden />
            {testing ? 'A enviar...' : 'Enviar teste'}
          </button>
        )}
      </div>

      {!info.isGsm && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs text-secondary-500 dark:text-amber-400">
          <span>
            Há acentos ou símbolos que reduzem o limite para 70 caracteres por
            SMS.
            {canSaveByStripping &&
              ` Sem acentos poupa ${info.segments - stripped.segments} SMS por contacto.`}
          </span>

          {stripped.isGsm && (
            <button
              type="button"
              onClick={() => onChange(removeAccents(value))}
              className="inline-flex items-center gap-1 rounded-md bg-secondary-500/20 px-2 py-1 font-semibold transition-colors hover:bg-amber-500/30"
            >
              Remover acentos
            </button>
          )}
        </div>
      )}
    </div>
  );
}
