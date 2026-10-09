'use client';

import {
  buildVariableOptions,
  type DynamicVariable,
} from '@/core/constants/dynamic-variables';
import { Braces, ChevronDown, HelpCircle, Search, Sparkles, User } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { VariablesDropdownProps } from './types';

function normalizeSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function VariablesDropdown({
  onSelect,
  customKeys = [],
  disabled = false,
  className = '',
}: VariablesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const options = useMemo(() => {
    return buildVariableOptions(customKeys);
  }, [customKeys]);

  // Filtragem
  const filteredContacto = useMemo(() => {
    const q = normalizeSearch(search);
    if (!q) return options.contacto;
    return options.contacto.filter(
      (v) =>
        normalizeSearch(v.key).includes(q) ||
        normalizeSearch(v.label).includes(q) ||
        normalizeSearch(v.description).includes(q)
    );
  }, [options.contacto, search]);

  const filteredPersonalizadas = useMemo(() => {
    const q = normalizeSearch(search);
    if (!q) return options.personalizadas;
    return options.personalizadas.filter(
      (v) =>
        normalizeSearch(v.key).includes(q) ||
        normalizeSearch(v.label).includes(q) ||
        normalizeSearch(v.description).includes(q)
    );
  }, [options.personalizadas, search]);

  const allFilteredItems = useMemo<DynamicVariable[]>(() => {
    return [...filteredContacto, ...filteredPersonalizadas];
  }, [filteredContacto, filteredPersonalizadas]);

  // Reset e foco ao abrir
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setFocusedIndex(0);
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    } else {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  // Fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectVariable = (variableKey: string) => {
    onSelect(`{{${variableKey}}}`);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) =>
        allFilteredItems.length > 0 ? (prev + 1) % allFilteredItems.length : -1
      );
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) =>
        allFilteredItems.length > 0
          ? (prev - 1 + allFilteredItems.length) % allFilteredItems.length
          : -1
      );
      return;
    }

    if (e.key === 'Enter') {
      if (focusedIndex >= 0 && focusedIndex < allFilteredItems.length) {
        e.preventDefault();
        handleSelectVariable(allFilteredItems[focusedIndex].key);
      }
    }
  };

  return (
    <div ref={wrapperRef} className={`relative inline-block ${className}`}>
      {/* Botão Gatilho */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 rounded-lg border border-border-ui bg-surface px-2.5 py-1.5 text-xs font-semibold text-primary-content shadow-xs transition-colors hover:border-primary/50 hover:bg-item-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isOpen ? 'border-primary ring-1 ring-primary' : ''
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <Braces size={14} className="text-primary" aria-hidden />
        <span>Variáveis</span>
        <ChevronDown
          size={13}
          className={`text-muted-content transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Variáveis dinâmicas disponíveis"
          className="absolute left-0 sm:left-auto right-auto sm:right-0 mt-1.5 z-50 flex w-[300px] sm:w-[340px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Campo de Pesquisa */}
          <div className="border-b border-border-ui p-2.5 bg-surface">
            <div className="relative flex items-center">
              <Search
                size={14}
                className="absolute left-2.5 text-muted-content pointer-events-none"
                aria-hidden
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Pesquisar variáveis..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setFocusedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full rounded-lg border border-border-ui bg-surface-raised/50 pl-8 pr-3 py-1.5 text-xs text-primary-content placeholder:text-muted-content outline-none transition-colors focus:border-primary focus:bg-surface focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Conteúdo com Scroll */}
          <div
            ref={listRef}
            className="flex-1 max-h-[300px] overflow-y-auto overscroll-contain p-2 flex flex-col gap-3"
          >
            {allFilteredItems.length === 0 && (
              <div className="py-6 text-center text-xs text-muted-content">
                Nenhuma variável encontrada para &quot;{search}&quot;.
              </div>
            )}

            {/* Secção Contacto */}
            {filteredContacto.length > 0 && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold text-muted-content uppercase tracking-wider">
                  <User size={12} className="text-primary" />
                  <span>Contacto</span>
                </div>

                <div className="flex flex-col gap-0.5">
                  {filteredContacto.map((item) => {
                    const globalIdx = allFilteredItems.indexOf(item);
                    const isFocused = globalIdx === focusedIndex;

                    return (
                      <button
                        key={item.key}
                        type="button"
                        role="option"
                        aria-selected={isFocused}
                        onClick={() => handleSelectVariable(item.key)}
                        onMouseEnter={() => setFocusedIndex(globalIdx)}
                        className={`flex items-start justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors ${
                          isFocused
                            ? 'bg-primary/10 text-primary-content'
                            : 'hover:bg-item-hover text-primary-content'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-primary">
                              {`{{${item.key}}}`}
                            </span>
                            <span className="text-xs font-medium text-primary-content truncate">
                              {item.label}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-muted-content truncate">
                            {item.description}
                          </p>
                        </div>

                        <span className="shrink-0 rounded-md bg-surface-raised px-1.5 py-0.5 font-mono text-[10px] text-muted-content max-w-[100px] truncate">
                          {item.exemplo}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Secção Personalizadas */}
            <div className="flex flex-col gap-1 border-t border-border-ui/60 pt-2">
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold text-muted-content uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-500" />
                  <span>Personalizadas</span>
                </div>
                {options.personalizadas.length > 0 && (
                  <span className="text-[10px] font-normal normal-case">
                    {filteredPersonalizadas.length} disponível{filteredPersonalizadas.length === 1 ? '' : 'is'}
                  </span>
                )}
              </div>

              {options.personalizadas.length === 0 ? (
                <div className="mx-1 my-1 flex items-start gap-2 rounded-xl border border-dashed border-border-ui bg-surface-raised/40 p-2.5 text-left">
                  <HelpCircle size={14} className="shrink-0 text-muted-content mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-muted-content">
                    As variáveis personalizadas são criadas ao adicionar contactos com campos adicionais (ex: cidade, empresa).
                  </p>
                </div>
              ) : filteredPersonalizadas.length === 0 ? (
                <p className="px-2 py-1 text-[11px] text-muted-content">
                  Nenhuma variável personalizada corresponde à pesquisa.
                </p>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {filteredPersonalizadas.map((item) => {
                    const globalIdx = allFilteredItems.indexOf(item);
                    const isFocused = globalIdx === focusedIndex;

                    return (
                      <button
                        key={item.key}
                        type="button"
                        role="option"
                        aria-selected={isFocused}
                        onClick={() => handleSelectVariable(item.key)}
                        onMouseEnter={() => setFocusedIndex(globalIdx)}
                        className={`flex items-start justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors ${
                          isFocused
                            ? 'bg-primary/10 text-primary-content'
                            : 'hover:bg-item-hover text-primary-content'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-primary">
                              {`{{${item.key}}}`}
                            </span>
                            <span className="text-xs font-medium text-primary-content truncate">
                              {item.label}
                            </span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-muted-content truncate">
                            {item.description}
                          </p>
                        </div>

                        <span className="shrink-0 rounded-md bg-surface-raised px-1.5 py-0.5 font-mono text-[10px] text-muted-content max-w-[100px] truncate">
                          {item.exemplo}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VariablesDropdown;
