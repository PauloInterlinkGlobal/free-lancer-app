'use client';

import {
  ACCEPTED_EXTENSIONS,
  MAX_CUSTOM_VARIABLES,
  MAX_FILE_SIZE_MB,
} from '@/modules/contacts/contacts-import/constants/import-steps';
import {
  CheckCircle2,
  Download,
  FileSpreadsheet,
  ListChecks,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface UploadStepProps {
  file: File | null;
  error: string;
  onFile: (file: File) => void;
  onRemove: () => void;
}

const requirements = [
  'Coluna obrigatória: "Telemóvel e Nome"',
  'Os números devem começar por 244',
  `Máximo de ${MAX_CUSTOM_VARIABLES} colunas personalizadas`,
  `Tamanho máximo: ${MAX_FILE_SIZE_MB} MB`,
];

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export function UploadStep({ file, error, onFile, onRemove }: UploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleSelected = (selected: File | undefined) => {
    if (selected) onFile(selected);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
      {/* Card esquerdo: upload */}
      <div className="flex flex-col gap-5 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UploadCloud size={24} aria-hidden />
          </span>

          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
              Carregue o seu ficheiro
            </h2>
            <p className="mt-1 text-sm text-muted-content">
              Carregue a sua lista de contactos para iniciar o envio de
              mensagens. Formatos aceites: CSV e XLSX.
            </p>
          </div>
        </div>

        {file ? (
          <div className="flex items-center gap-3 rounded-xl bg-surface-raised p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
              <FileSpreadsheet size={24} aria-hidden />
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-primary-content">
                {file.name}
              </p>
              <p className="flex items-center gap-1 text-xs text-green-500">
                <CheckCircle2 size={12} aria-hidden />
                {formatSize(file.size)} · Ficheiro carregado
              </p>
            </div>

            <button
              type="button"
              aria-label="Remover ficheiro"
              onClick={onRemove}
              className="rounded-lg p-2 text-muted-content transition-colors hover:bg-item-hover hover:text-red-500"
            >
              <Trash2 size={18} aria-hidden />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleSelected(e.dataTransfer.files?.[0]);
            }}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 border-dashed p-10 transition-colors hover:border-primary ${
              dragging ? 'border-primary bg-primary/5' : 'border-ui'
            }`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UploadCloud size={28} aria-hidden />
            </span>
            <span className="text-sm font-semibold text-primary-content">
              Arraste o ficheiro ou clique para seleccionar
            </span>
            <span className="text-xs text-muted-content">
              CSV ou XLSX, até {MAX_FILE_SIZE_MB} MB
            </span>
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(',')}
          className="hidden"
          onChange={(e) => handleSelected(e.target.files?.[0])}
        />

        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}

        <a
          href="/templates/contactos-exemplo.csv"
          download
          className="flex w-fit items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Download size={16} aria-hidden />
          Descarregar ficheiro de exemplo
        </a>
      </div>

      {/* Card direito: requisitos */}
      <div className="flex flex-col gap-5 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ListChecks size={20} aria-hidden />
          </span>
          <h3 className="text-base font-semibold text-primary-content">
            Requisitos do ficheiro
          </h3>
        </div>

        <ul className="flex list-none flex-col gap-3 p-0">
          {requirements.map((rule) => (
            <li key={rule} className="flex items-start gap-2 text-sm">
              <CheckCircle2
                size={16}
                aria-hidden
                className="mt-0.5 shrink-0 text-primary"
              />
              <span className="text-primary-content">{rule}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-xl bg-surface-raised p-3">
          <p className="text-xs text-muted-content">Exemplo de número válido</p>
          <p className="mt-1 font-mono text-sm font-semibold tracking-wide">
            <span className="text-primary">244</span>{' '}
            <span className="text-primary-content">9XXX</span>{' '}
            <span className="text-muted-content">XXX XXX</span>
          </p>
        </div>
      </div>
    </div>
  );
}
