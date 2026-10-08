'use client';

import { useState } from 'react';
import { ITemplate } from '../interfaces/templates';
import {
  TEMPLATE_COMPOSER_ID,
  TEMPLATE_COMPOSER_TITLE_ID,
  TemplateComposer,
} from './TemplateComposer/TemplateComposer';
import { TemplatePhonePreview } from './TemplatePreview/TemplatePhonePreview';
import { TemplatesGrid } from './TemplatesGrid/TemplatesGrid';

export function TemplatesWorkspace({ templates }: { templates: ITemplate[] }) {
  const [base, setBase] = useState<ITemplate | null>(null);
  const [baseNonce, setBaseNonce] = useState(0);

  const handleUseAsBase = (template: ITemplate) => {
    setBase(template);
    setBaseNonce((n) => n + 1);
    document
      .getElementById(TEMPLATE_COMPOSER_ID)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById(TEMPLATE_COMPOSER_TITLE_ID)?.focus();
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] items-start">
      <div className="flex flex-col gap-6 min-w-0">
        <TemplateComposer base={base} baseNonce={baseNonce} />
        <TemplatesGrid
          initialTemplates={templates}
          onUseAsBase={handleUseAsBase}
        />
      </div>

      <div className="lg:sticky lg:top-6">
        <TemplatePhonePreview />
      </div>
    </div>
  );
}
