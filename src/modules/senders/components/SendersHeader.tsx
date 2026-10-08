'use client';

import { Button } from '@/core/components/Button';
import { useModalStore } from '@/core/store/useModalStore';
import { HelpCircle, Info, X } from 'lucide-react';
import { useState } from 'react';

export function SendersHeader() {
  const { openModal } = useModalStore();
  const [showGuidelines, setShowGuidelines] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={HelpCircle}
            onClick={() => setShowGuidelines((prev) => !prev)}
            className="rounded-xl"
          >
            {showGuidelines ? 'Ocultar regras' : 'Regras de senders'}
          </Button>
        </div>
      </div>

      {showGuidelines && (
        <div className="relative flex flex-col gap-2 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs sm:text-sm text-primary-content transition-all animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <Info className="h-4 w-4 shrink-0" />
              <span>Diretrizes e Regras de Validação das Operadoras</span>
            </div>
            <button
              type="button"
              onClick={() => setShowGuidelines(false)}
              className="text-muted-content hover:text-primary-content"
              aria-label="Fechar diretrizes"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-3 text-muted-content">
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-primary">•</span>
              <span>
                <strong>Comprimento:</strong> Máximo de 11 caracteres
                alfanuméricos.
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-primary">•</span>
              <span>
                <strong>Formato:</strong> Apenas letras, números e traços. Sem
                acentos ou caracteres especiais.
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-primary">•</span>
              <span>
                <strong>Prazo de Validação:</strong> Entre 24h a 48h úteis após
                análise com as operadoras locais.
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
