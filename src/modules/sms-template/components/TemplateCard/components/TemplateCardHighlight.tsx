'use client';

import React from 'react';

interface TemplateCardHighlightProps {
  content: string;
}

export function TemplateCardHighlight({ content }: TemplateCardHighlightProps) {
  const parts = content.split(/(\{\{[^}]+\}\})/g);

  return (
    <div className="rounded-lg border border-border-ui bg-surface-raised p-3 font-mono text-xs leading-relaxed text-secondary-content min-h-[96px]">
      {parts.map((part, index) => {
        if (part.startsWith('{{') && part.endsWith('}}')) {
          return (
            <span key={index} className="font-semibold text-primary">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
}
