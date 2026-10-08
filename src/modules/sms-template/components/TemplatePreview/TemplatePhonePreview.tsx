'use client';

import { Smartphone } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTemplatePreviewStore } from '../../store/useTemplatePreviewStore';
import { PhoneMockup } from './components/PhoneMockup';
import { PreviewControls } from './components/PreviewControls';
import { getSmsMetrics, interpolateTemplateContent } from './utils/smsMetrics';

export function TemplatePhonePreview() {
  const selectedTemplate = useTemplatePreviewStore(
    (state) => state.selectedTemplate
  );
  const previewSender = useTemplatePreviewStore((state) => state.previewSender);
  const setPreviewSender = useTemplatePreviewStore(
    (state) => state.setPreviewSender
  );
  const previewType = useTemplatePreviewStore((state) => state.previewType);
  const setPreviewType = useTemplatePreviewStore(
    (state) => state.setPreviewType
  );
  const previewTheme = useTemplatePreviewStore((state) => state.previewTheme);
  const setPreviewTheme = useTemplatePreviewStore(
    (state) => state.setPreviewTheme
  );
  const fillVariables = useTemplatePreviewStore((state) => state.fillVariables);
  const toggleFillVariables = useTemplatePreviewStore(
    (state) => state.toggleFillVariables
  );
  const sampleVariables = useTemplatePreviewStore(
    (state) => state.sampleVariables
  );

  const [currentTime, setCurrentTime] = useState('14:30');

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

  const metrics = useMemo(
    () => getSmsMetrics(renderedContent),
    [renderedContent]
  );

  const initials = previewSender.trim().slice(0, 2).toUpperCase() || 'SM';
  const isFlash = previewType === 'flash';

  return (
    <aside className="flex w-full flex-col gap-4">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-text-primary">
            Pré-visualização no Telemóvel
          </h3>
        </div>
      </div>

      {/* Interactive Controls Pod */}
      <PreviewControls
        previewSender={previewSender}
        setPreviewSender={setPreviewSender}
        previewType={previewType}
        setPreviewType={setPreviewType}
        previewTheme={previewTheme}
        setPreviewTheme={setPreviewTheme}
        fillVariables={fillVariables}
        toggleFillVariables={toggleFillVariables}
      />

      {/* Phone Mockup Frame */}
      <PhoneMockup
        initials={initials}
        previewSender={previewSender}
        currentTime={currentTime}
        renderedContent={renderedContent}
        hasTemplate={!!selectedTemplate}
        isFlash={isFlash}
        theme={previewTheme}
      />

      {/* Metrics Bar */}
      {selectedTemplate && (
        <div className="rounded-xl border border-border-ui bg-surface px-3.5 py-2.5 flex items-center justify-between text-xs text-text-muted">
          <span>{metrics.length} caracteres</span>
          <span className="font-semibold text-text-primary">
            {metrics.segments} página{metrics.segments === 1 ? '' : 's'} SMS
          </span>
        </div>
      )}
    </aside>
  );
}

export default TemplatePhonePreview;
