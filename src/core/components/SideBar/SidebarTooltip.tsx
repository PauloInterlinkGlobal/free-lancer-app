'use client';

import { ReactNode, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface SidebarTooltipProps {
  label: string;
  description?: string;
  enabled?: boolean;
  children: ReactNode;
}

export function SidebarTooltip({
  label,
  description,
  enabled = true,
  children,
}: SidebarTooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const show = () => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ top: rect.top + rect.height / 2, left: rect.right + 12 });
  };

  const hide = () => setPos(null);

  return (
    <div
      ref={ref}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {enabled &&
        pos &&
        createPortal(
          <div
            role="tooltip"
            style={{ top: pos.top, left: pos.left }}
            className="pointer-events-none fixed z-50 w-[260px] -translate-y-1/2 rounded-2xl border border-border-ui bg-surface p-4 shadow-xl"
          >
            <span
              aria-hidden
              className="absolute top-1/2 -left-[6px] h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l border-border-ui bg-surface"
            />

            <p className="text-sm font-semibold text-primary-content">
              {label}
            </p>

            {description && (
              <p className="mt-1.5 text-xs leading-relaxed text-secondary-content">
                {description}
              </p>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
