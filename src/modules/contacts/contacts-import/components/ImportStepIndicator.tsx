import { IMPORT_STEPS } from '@/modules/contacts/contacts-import/constants/import-steps';
import { Check } from 'lucide-react';

interface ImportStepIndicatorProps {
  current: number;
}

export function ImportStepIndicator({ current }: ImportStepIndicatorProps) {
  return (
    <ol className="flex list-none items-center p-0">
      {IMPORT_STEPS.map((step, index) => {
        const done = index < current;
        const active = index === current;

        return (
          <li key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  done || active
                    ? 'bg-primary text-white'
                    : 'bg-surface-raised text-muted-content'
                }`}
              >
                {done ? <Check size={16} aria-hidden /> : index + 1}
              </span>

              <span
                className={`hidden text-sm sm:block ${
                  active
                    ? 'font-semibold text-primary-content'
                    : 'text-muted-content'
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < IMPORT_STEPS.length - 1 && (
              <span
                aria-hidden
                className={`mx-3 h-px flex-1 ${
                  done ? 'bg-primary' : 'bg-primary/15'
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
