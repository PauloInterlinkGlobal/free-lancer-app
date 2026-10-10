'use client';

import {
  ACCEPTED_EXTENSIONS,
  IMPORT_FIELDS,
  IMPORT_STEPS,
  MAX_FILE_SIZE_MB,
} from '@/modules/contacts/contacts-import/constants/import-steps';
import { useFilePreview } from '@/modules/contacts/contacts-import/hooks/use-file-preview';
import { IGroupOption } from '@/modules/contacts/contacts-import/interfaces/contacts-import';
import { useState } from 'react';
import { ImportFooter } from './ImportFooter';
import { ImportStepIndicator } from './ImportStepIndicator';
import { ImportSuccess } from './ImportSuccess';
import { MappingStep } from './steps/MappingStep';
import { ReviewStep } from './steps/ReviewStep';
import { UploadStep } from './steps/UploadStep';

interface ImportWizardProps {
  groups: IGroupOption[];
}

export function ImportWizardClient({ groups }: ImportWizardProps) {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [group, setGroup] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const { preview, loading, error: previewError } = useFilePreview(file);

  const isLast = step === IMPORT_STEPS.length - 1;

  const requiredMapped = IMPORT_FIELDS.filter((f) => f.required).every(
    (f) => mapping[f.id]
  );

  const nextDisabled =
    (step === 0 && !file) ||
    (step === 1 && !requiredMapped) ||
    (step === 2 && !group);

  const handleFile = (selected: File) => {
    const extension = selected.name.split('.').pop()?.toLowerCase() ?? '';

    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      setError('Formato inválido. Use um ficheiro CSV ou XLSX.');
      return;
    }
    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`O ficheiro excede ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    setError('');
    setFile(selected);
  };

  const handleReset = () => {
    setStep(0);
    setFile(null);
    setError('');
    setMapping({});
    setGroup('');
    setTags([]);
    setDone(false);
  };

  const handleNext = () => {
    if (isLast) {
      setDone(true);
      return;
    }
    setStep((prev) => prev + 1);
  };

  if (done) return <ImportSuccess onReset={handleReset} />;

  const mappedCount = Object.values(mapping).filter(Boolean).length;
  const totalRows = preview?.totalRows.toLocaleString() ?? '0';
  const groupLabel = groups.find((g) => String(g.value) === group)?.label;

  const summaries = [
    file?.name,
    step > 0 ? `${mappedCount} campos associados` : undefined,
    undefined,
  ];

  let footerSummary: string;
  if (step === 0) {
    footerSummary = file
      ? `${file.name}${preview ? ` · ${totalRows} contactos` : ''}`
      : 'Nenhum ficheiro seleccionado';
  } else if (step === 1) {
    footerSummary = requiredMapped
      ? 'Campos obrigatórios mapeados'
      : 'Mapeie Nome e Telemóvel para continuar';
  } else {
    footerSummary = group
      ? `${totalRows} contactos · grupo ${groupLabel ?? ''}`
      : 'Seleccione um grupo para continuar';
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
      <ImportStepIndicator current={step} summaries={summaries} />

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        {step === 0 && (
          <UploadStep
            file={file}
            error={error}
            preview={preview}
            loading={loading}
            onFile={handleFile}
            onRemove={() => setFile(null)}
          />
        )}

        {step === 1 && (
          <MappingStep
            preview={preview}
            loading={loading}
            error={previewError}
            mapping={mapping}
            onChange={(fieldId, column) =>
              setMapping((prev) => ({ ...prev, [fieldId]: column }))
            }
          />
        )}

        {step === 2 && file && preview && (
          <ReviewStep
            fileName={file.name}
            preview={preview}
            mapping={mapping}
            groups={groups}
            group={group}
            onGroupChange={setGroup}
            tags={tags}
            onTagsChange={setTags}
          />
        )}

        <ImportFooter
          showBack={step > 0}
          nextLabel={isLast ? 'Confirmar e importar' : 'Avançar'}
          nextDisabled={nextDisabled}
          summary={footerSummary}
          onBack={() => setStep((prev) => prev - 1)}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
