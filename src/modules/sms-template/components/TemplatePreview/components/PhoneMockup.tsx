'use client';

import { ArrowLeft, CheckCheck, Info, Mic, Plus } from 'lucide-react';
import React from 'react';
import { FlashOverlay } from './FlashOverlay';

interface PhoneMockupProps {
  initials: string;
  previewSender: string;
  currentTime: string;
  renderedContent: string;
  hasTemplate: boolean;
  isFlash: boolean;
  theme?: 'light' | 'dark';
}

export function PhoneMockup({
  initials,
  previewSender,
  currentTime,
  renderedContent,
  hasTemplate,
  isFlash,
  theme = 'light',
}: PhoneMockupProps) {
  const isDark = theme === 'dark';

  return (
    <div className="mx-auto w-[280px]">
      <div
        className={`relative overflow-hidden rounded-[2.5rem] border-[8px] shadow-2xl transition-colors duration-200 ${
          isDark
            ? 'border-neutral-800 bg-neutral-900 shadow-neutral-950/50'
            : 'border-neutral-800 bg-white shadow-xl'
        }`}
      >
        <div className="absolute left-1/2 top-0 z-20 flex h-4 w-24 -translate-x-1/2 items-center justify-center rounded-b-xl bg-neutral-800">
          <div className="h-1 w-8 rounded-full bg-neutral-600" />
        </div>

        <div className="relative flex h-[500px] flex-col">
          {/* Top Bar */}
          <div
            className={`flex items-center gap-2.5 border-b px-3 pb-2.5 pt-7 transition-colors ${
              isDark
                ? 'border-neutral-800 bg-neutral-900'
                : 'border-neutral-200 bg-white'
            }`}
          >
            <ArrowLeft
              size={16}
              className={`shrink-0 ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            />
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-xs font-bold leading-tight ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}
              >
                {previewSender}
              </p>
              <p
                className={`truncate text-[10px] ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              >
                SMS Corporativo
              </p>
            </div>
            <Info
              size={16}
              className={`shrink-0 ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            />
          </div>

          {/* Conversation Screen */}
          <div
            className={`flex flex-1 flex-col gap-3 overflow-y-auto px-3 py-3.5 transition-colors ${
              isDark ? 'bg-neutral-950' : 'bg-[#f8fafc]'
            }`}
            style={{
              backgroundImage: isDark
                ? 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)'
                : 'radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          >
            <p
              className={`pb-1 text-center text-[10px] font-medium ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}
            >
              Hoje {currentTime}
            </p>

            {/* Received Message Bubble */}
            <div
              className={`w-fit max-w-[90%] rounded-2xl rounded-tl-sm border px-3.5 py-2.5 shadow-sm transition-colors ${
                isDark
                  ? 'border-neutral-800 bg-neutral-900 text-neutral-100'
                  : 'border-neutral-200 bg-white text-neutral-900'
              }`}
            >
              {hasTemplate ? (
                <p className="whitespace-pre-wrap break-words text-xs leading-relaxed">
                  {renderedContent}
                </p>
              ) : (
                <p
                  className={`text-xs italic leading-relaxed ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                  }`}
                >
                  Selecione um modelo à esquerda para visualizar aqui.
                </p>
              )}
              <div
                className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                  isDark ? 'text-neutral-400' : 'text-neutral-400'
                }`}
              >
                <span>{currentTime}</span>
              </div>
            </div>

            {/* Sent Message Bubble */}
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-3 py-2 text-white shadow-sm">
              <p className="whitespace-pre-wrap break-words text-xs leading-relaxed">
                Recebido, obrigado!
              </p>
              <div className="mt-1 flex items-center justify-end gap-1 text-[10px] opacity-80">
                <span>{currentTime}</span>
                <CheckCheck size={12} />
              </div>
            </div>
          </div>

          {/* Bottom Composer Bar */}
          <div
            className={`flex items-center gap-2 border-t px-3 py-2 transition-colors ${
              isDark
                ? 'border-neutral-800 bg-neutral-900'
                : 'border-neutral-200 bg-white'
            }`}
          >
            <Plus
              size={18}
              className={`shrink-0 ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            />
            <div
              className={`flex-1 rounded-full px-3 py-1.5 text-[11px] ${
                isDark
                  ? 'bg-neutral-800 text-neutral-400'
                  : 'bg-neutral-100 text-neutral-500'
              }`}
            >
              Mensagem de texto
            </div>
            <Mic
              size={16}
              className={`shrink-0 ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}
            />
          </div>

          {isFlash && (
            <FlashOverlay
              previewSender={previewSender}
              renderedContent={renderedContent}
              theme={theme}
            />
          )}
        </div>
      </div>
    </div>
  );
}
