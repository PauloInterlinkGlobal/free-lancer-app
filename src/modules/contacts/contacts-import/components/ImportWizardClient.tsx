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

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl bg-surface p-4 shadow-sm md:p-5">
        <ImportStepIndicator current={step} />
      </div>

      {step === 0 && (
        <UploadStep
          file={file}
          error={error}
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
          totalRows={preview.totalRows}
          groups={groups}
          group={group}
          onGroupChange={setGroup}
          tags={tags}
          onTagsChange={setTags}
        />
      )}

      <div className="rounded-2xl bg-surface p-4 shadow-sm md:p-5">
        <ImportFooter
          showBack={step > 0}
          nextLabel={isLast ? 'Confirmar e importar' : 'Avançar'}
          nextDisabled={nextDisabled}
          onBack={() => setStep((prev) => prev - 1)}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
