'use client';

import {
  ACCEPTED_EXTENSIONS,
  MAX_CUSTOM_VARIABLES,
  MAX_FILE_SIZE_MB,
} from '@/modules/contacts/contacts-import/constants/import-steps';
import type { FilePreview } from '@/modules/contacts/contacts-import/utils/read-file-preview';
import { Download, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';
import { ImportStepHeader } from '../ImportStepHeader';
import { UploadFileSummary } from './UploadFileSummary';

interface UploadStepProps {
  file: File | null;
  error: string;
  preview: FilePreview | null;
  loading: boolean;
  onFile: (file: File) => void;
  onRemove: () => void;
}

const tiles = [
  {
    value: '2',
    label: 'Campos obrigatórios',
    hint: 'Telemóvel e Nome',
    className: 'bg-primary/10',
  },
  {
    value: 'CSV',
    label: 'ou XLSX',
    hint: 'Formatos aceites',
    className: 'bg-surface shadow-sm',
  },
  {
    value: String(MAX_CUSTOM_VARIABLES),
    label: 'Colunas personalizadas',
    hint: 'Máximo por ficheiro',
    className: 'bg-surface-raised',
  },
  {
    value: `${MAX_FILE_SIZE_MB} MB`,
    label: 'Tamanho máximo',
    hint: 'Por ficheiro',
    className: 'bg-surface shadow-sm',
  },
];

export function UploadStep({
  file,
  error,
  preview,
  loading,
  onFile,
  onRemove,
}: UploadStepProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleSelected = (selected: File | undefined) => {
    if (selected) onFile(selected);
    if (inputRef.current) inputRef.current.value = '';
  };

  const hiddenInput = (
    <input
      ref={inputRef}
      type="file"
      accept={ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(',')}
      className="hidden"
      onChange={(e) => handleSelected(e.target.files?.[0])}
    />
  );

  const errorMessage = error && (
    <p role="alert" className="px-1 text-sm text-red-500">
      {error}
    </p>
  );

  if (file) {
    return (
      <div className="flex flex-col gap-4">
        <ImportStepHeader
          eyebrow="Passo 1 de 3 · Upload"
          title="Ficheiro recebido"
          description="Verificámos o seu ficheiro antes de avançar."
        />

        <UploadFileSummary
          file={file}
          preview={preview}
          loading={loading}
          onRemove={onRemove}
        />

        {errorMessage}
        {hiddenInput}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ImportStepHeader
        eyebrow="Passo 1 de 3 · Upload"
        title="Carregue a sua lista de contactos"
        description="Comece o envio de mensagens a partir de um ficheiro CSV ou XLSX."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.7fr_1fr]">
        {/* Zona de upload */}
        <div className="flex rounded-3xl bg-surface p-3 shadow-sm">
          <div
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
            className={`flex min-h-72 flex-1 flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
              dragging
                ? 'border-primary bg-primary/10'
                : 'border-primary/60 bg-primary/5'
            }`}
          >
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary text-white">
              <UploadCloud size={32} aria-hidden />
            </span>

            <h2 className="text-xl font-bold text-primary-content md:text-2xl">
              Largue o ficheiro aqui
            </h2>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="min-h-11 rounded-full bg-primary px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Escolher ficheiro
            </button>

            <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-surface px-3 py-1.5 text-primary">
                CSV
              </span>
              <span className="rounded-full bg-surface px-3 py-1.5 text-primary">
                XLSX
              </span>
              <span className="rounded-full bg-surface px-3 py-1.5 text-muted-content">
                até {MAX_FILE_SIZE_MB} MB
              </span>
            </div>
          </div>
        </div>

        {/* Exemplo + número válido */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-1 flex-col gap-3 rounded-3xl bg-primary/10 p-5">
            <h3 className="text-base font-bold text-primary-content">
              Ficheiro de exemplo
            </h3>

            <div className="rounded-xl bg-surface px-3 py-1 text-xs">
              <div className="flex justify-between border-b border-black/5 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-content">
                <span>Telemóvel</span>
                <span>Nome</span>
              </div>
              <div className="flex justify-between border-b border-black/5 py-2 text-primary-content">
                <span>+244 923 000 001</span>
                <span>João</span>
              </div>
              <div className="flex justify-between py-2 text-primary-content">
                <span>+244 924 000 002</span>
                <span>Maria</span>
              </div>
            </div>

            <a
              href="/templates/contactos-exemplo.csv"
              download
              className="flex min-h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Download size={16} aria-hidden />
              Descarregar exemplo
            </a>
          </div>

          <div className="flex flex-col gap-3 rounded-3xl bg-surface p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-content">
              Número válido
            </span>
            <p className="flex flex-wrap gap-1.5 font-mono text-base font-bold">
              <span className="rounded-lg bg-primary px-2.5 py-1.5 text-white">
                +244
              </span>
              <span className="rounded-lg bg-surface-raised px-2.5 py-1.5 text-muted-content">
                9XX
              </span>
              <span className="rounded-lg bg-surface-raised px-2.5 py-1.5 text-muted-content">
                XXX
              </span>
              <span className="rounded-lg bg-surface-raised px-2.5 py-1.5 text-muted-content">
                XXX
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Mosaico de requisitos */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={`flex flex-col gap-1 rounded-3xl p-5 ${tile.className}`}
          >
            <span className="text-3xl font-bold leading-none text-primary-content">
              {tile.value}
            </span>
            <span className="mt-1 text-sm font-semibold text-primary-content">
              {tile.label}
            </span>
            <span className="text-xs text-muted-content">{tile.hint}</span>
          </div>
        ))}
      </div>

      {errorMessage}
      {hiddenInput}
    </div>
  );
}
