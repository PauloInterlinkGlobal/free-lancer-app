import { MAX_FILE_SIZE_MB } from '@/modules/contacts/contacts-import/constants/import-steps';
import type { FilePreview } from '@/modules/contacts/contacts-import/utils/read-file-preview';
import {
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Loader2,
  Trash2,
} from 'lucide-react';

interface UploadFileSummaryProps {
  file: File;
  preview: FilePreview | null;
  loading: boolean;
  onRemove: () => void;
}

type CheckState = 'ok' | 'pending' | 'warn';

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export function UploadFileSummary({
  file,
  preview,
  loading,
  onRemove,
}: UploadFileSummaryProps) {
  const extension = file.name.split('.').pop()?.toUpperCase() ?? '';
  const readState: CheckState = loading ? 'pending' : preview ? 'ok' : 'warn';
  const sampleRows = preview?.rows.slice(0, 3) ?? [];

  const checks: { state: CheckState; label: string }[] = [
    { state: 'ok', label: `Formato ${extension} aceite` },
    {
      state: file.size <= MAX_FILE_SIZE_MB * 1024 * 1024 ? 'ok' : 'warn',
      label: `Dentro do limite de ${MAX_FILE_SIZE_MB} MB`,
    },
    {
      state: readState,
      label: loading
        ? 'A ler o ficheiro…'
        : preview
          ? `${preview.totalRows.toLocaleString()} linhas encontradas`
          : 'Não foi possível ler as linhas',
    },
    {
      state: readState,
      label: loading
        ? 'A detectar colunas…'
        : preview
          ? `${preview.headers.length} colunas detectadas`
          : 'Não foi possível detectar colunas',
    },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 rounded-3xl bg-primary p-5 text-white md:px-6">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20">
          <FileSpreadsheet size={28} aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold md:text-xl">{file.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/85">
            <CheckCircle2 size={14} aria-hidden />
            {formatSize(file.size)} · Ficheiro carregado
          </p>
        </div>

        <button
          type="button"
          aria-label="Remover ficheiro"
          onClick={onRemove}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
        >
          <Trash2 size={18} aria-hidden />
        </button>
      </div>

      {/* Contagens */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1 rounded-3xl bg-surface p-5 shadow-sm">
          <span className="text-4xl font-bold leading-none text-primary-content">
            {preview ? preview.totalRows.toLocaleString() : '—'}
          </span>
          <span className="text-sm font-semibold text-primary-content">
            Linhas no ficheiro
          </span>
        </div>
        <div className="flex flex-col gap-1 rounded-3xl bg-primary/10 p-5">
          <span className="text-4xl font-bold leading-none text-primary-content">
            {preview ? preview.headers.length : '—'}
          </span>
          <span className="text-sm font-semibold text-primary-content">
            Colunas detectadas
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
        {/* Diagnóstico */}
        <div className="flex flex-col gap-4 rounded-3xl bg-surface p-5 shadow-sm md:p-6">
          <h3 className="text-base font-bold text-primary-content">
            Diagnóstico
          </h3>

          <ul className="flex list-none flex-col gap-3 p-0">
            {checks.map((check) => (
              <li
                key={check.label}
                className="flex items-center gap-3 text-sm text-primary-content"
              >
                {check.state === 'ok' && (
                  <CheckCircle2
                    size={20}
                    aria-hidden
                    className="shrink-0 text-green-500"
                  />
                )}
                {check.state === 'pending' && (
                  <Loader2
                    size={20}
                    aria-hidden
                    className="shrink-0 animate-spin text-muted-content"
                  />
                )}
                {check.state === 'warn' && (
                  <AlertTriangle
                    size={20}
                    aria-hidden
                    className="shrink-0 text-amber-500"
                  />
                )}
                {check.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Pré-visualização */}
        <div className="flex min-w-0 flex-col gap-3 rounded-3xl bg-surface p-5 shadow-sm md:p-6">
          <h3 className="text-base font-bold text-primary-content">
            Pré-visualização
          </h3>

          {preview ? (
            <>
              <div className="overflow-x-auto rounded-2xl bg-surface-raised px-4 py-1">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-[11px] font-bold uppercase tracking-wider text-muted-content">
                      {preview.headers.map((header, i) => (
                        <th key={i} className="whitespace-nowrap py-2.5 pr-4">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-primary-content">
                    {sampleRows.map((row, r) => (
                      <tr key={r} className="border-t border-black/5">
                        {row.map((cell, c) => (
                          <td key={c} className="whitespace-nowrap py-2.5 pr-4">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-content">
                A mostrar {sampleRows.length} de {preview.totalRows} linhas.
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-content">
              {loading
                ? 'A ler o ficheiro…'
                : 'Sem pré-visualização disponível.'}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
