'use client';

import { Moon, Smartphone, Sun } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTemplatePreviewStore } from '../../store/useTemplatePreviewStore';
import { PhoneMockup } from './components/PhoneMockup';
import { interpolateTemplateContent } from './utils/smsMetrics';

export function TemplatePhonePreview() {
  const selectedTemplate = useTemplatePreviewStore(
    (state) => state.selectedTemplate
  );
  const previewSender = useTemplatePreviewStore((state) => state.previewSender);

  const previewTheme = useTemplatePreviewStore((state) => state.previewTheme);
  const setPreviewTheme = useTemplatePreviewStore(
    (state) => state.setPreviewTheme
  );
  const fillVariables = useTemplatePreviewStore((state) => state.fillVariables);

  const sampleVariables = useTemplatePreviewStore(
    (state) => state.sampleVariables
  );

  const [currentTime, setCurrentTime] = useState('14:30');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
  }, [isOpen]);

  useEffect(() => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    setCurrentTime(`${h}:${m}`);
  }, []);

  const renderedContent = useMemo(() => {
    if (!selectedTemplate) return '';
    return interpolateTemplateContent(
      selectedTemplate.content,
      sampleVariables,
      fillVariables
    );
  }, [selectedTemplate, fillVariables, sampleVariables]);

  const initials = previewSender.trim().slice(0, 2).toUpperCase() || 'SM';

  return (
    <aside ref={containerRef} className="flex w-full flex-col gap-4">
      {/* Header Info */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-text-primary">
            Pré-visualização no Telemóvel
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')
            }
            aria-label={
              previewTheme === 'dark'
                ? 'Mudar visor para modo claro'
                : 'Mudar visor para modo escuro'
            }
            title={previewTheme === 'dark' ? 'Modo claro' : 'Modo escuro'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-ui bg-surface text-text-muted transition-colors hover:bg-item-hover hover:text-text-primary"
          >
            {previewTheme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="template-phone-simulator"
            aria-label={isOpen ? 'Fechar simulador' : 'Abrir simulador'}
            title="Simulador"
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              isOpen
                ? 'border-primary bg-primary text-white'
                : 'border-border-ui bg-surface text-text-muted hover:bg-item-hover hover:text-text-primary'
            }`}
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>

        {/* Floating phone dropdown */}
        {isOpen && (
          <div
            id="template-phone-simulator"
            className="pointer-events-none absolute right-10 top-full z-30 mt-8"
          >
            <div className="pointer-events-auto">
              <PhoneMockup
                initials={initials}
                previewSender={previewSender}
                currentTime={currentTime}
                renderedContent={renderedContent}
                hasTemplate={!!selectedTemplate}
                theme={previewTheme}
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default TemplatePhonePreview;
