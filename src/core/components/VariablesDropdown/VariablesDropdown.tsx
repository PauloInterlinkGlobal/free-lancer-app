'use client';

import {
  buildVariableOptions,
  type DynamicVariable,
} from '@/core/constants/dynamic-variables';
import {
  Braces,
  ChevronDown,
  HelpCircle,
  Search,
  Sparkles,
  User,
} from 'lucide-react';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { VariablesDropdownProps } from './types';

const NO_CUSTOM_KEYS: string[] = [];

function normalizeSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function VariablesDropdown({
  onSelect,
  customKeys = NO_CUSTOM_KEYS,
  disabled = false,
  className = '',
}: VariablesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const baseId = useId();
  const listId = `${baseId}-list`;
  const contactGroupId = `${baseId}-contacto`;
  const customGroupId = `${baseId}-personalizadas`;
  const optionId = (index: number) => `${baseId}-opt-${index}`;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const options = useMemo(() => buildVariableOptions(customKeys), [customKeys]);

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

  // Ordem única das opções: primeiro as do sistema, depois as personalizadas.
  // O índice de cada opção é o mesmo usado pela navegação por teclado.
  const allFilteredItems = useMemo<DynamicVariable[]>(
    () => [...filteredContacto, ...filteredPersonalizadas],
    [filteredContacto, filteredPersonalizadas]
  );
  const customOffset = filteredContacto.length;
  const activeOptionId =
    activeIndex >= 0 && activeIndex < allFilteredItems.length
      ? optionId(activeIndex)
      : undefined;

  const close = (returnFocus: boolean) => {
    setIsOpen(false);
    setSearch('');
    setActiveIndex(-1);
    if (returnFocus) triggerRef.current?.focus();
  };

  // Ao abrir: foco na pesquisa e primeira opção ativa
  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
    const frame = requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  // Fecha se o componente ficar desativado com o menu aberto
  useEffect(() => {
    if (disabled && isOpen) close(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  // Mantém a opção ativa visível dentro da lista com scroll
  useEffect(() => {
    if (!isOpen || activeIndex < 0) return;
    document
      .getElementById(optionId(activeIndex))
      ?.scrollIntoView?.({ block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isOpen]);

  // Fecha ao clicar fora
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        close(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSelectVariable = (variableKey: string) => {
    onSelect(`{{${variableKey}}}`);
    close(true);
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isOpen) setIsOpen(true);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    const count = allFilteredItems.length;

    switch (e.key) {
      case 'Escape':
        // Contém o Esc: sem isto, um dropdown dentro de modal fechava também o modal
        e.preventDefault();
        e.stopPropagation();
        close(true);
        return;

      case 'ArrowDown':
        e.preventDefault();
        if (count > 0) setActiveIndex((prev) => (prev + 1) % count);
        return;

      case 'ArrowUp':
        e.preventDefault();
        if (count > 0) setActiveIndex((prev) => (prev - 1 + count) % count);
        return;

      case 'Home':
        if (count > 0) {
          e.preventDefault();
          setActiveIndex(0);
        }
        return;

      case 'End':
        if (count > 0) {
          e.preventDefault();
          setActiveIndex(count - 1);
        }
        return;

      case 'Enter':
        if (activeIndex >= 0 && activeIndex < count) {
          e.preventDefault();
          handleSelectVariable(allFilteredItems[activeIndex].key);
        }
        return;
    }
  };

  const renderOption = (item: DynamicVariable, index: number) => {
    const isActive = index === activeIndex;

    return (
      <div
        key={item.key}
        id={optionId(index)}
        role="option"
        tabIndex={-1}
        aria-label={`${item.label}, ${`{{${item.key}}}`}`}
        onClick={() => handleSelectVariable(item.key)}
        onMouseEnter={() => setActiveIndex(index)}
        className={`flex cursor-pointer items-start justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors ${
          isActive
            ? 'bg-primary/10 text-primary-content'
            : 'text-primary-content hover:bg-item-hover'
        }`}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-primary">
              {`{{${item.key}}}`}
            </span>
            <span className="truncate text-xs font-medium text-primary-content">
              {item.label}
            </span>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-muted-content">
            {item.description}
          </p>
        </div>

        <span
          aria-hidden
          className="max-w-[100px] shrink-0 truncate rounded-md bg-surface-raised px-1.5 py-0.5 font-mono text-[10px] text-muted-content"
        >
          {item.exemplo}
        </span>
      </div>
    );
  };

  const noResults = allFilteredItems.length === 0;

  return (
    <div
      ref={wrapperRef}
      className={`relative inline-block ${className}`}
      onBlur={(e) => {
        // Foco que sai do componente (Tab, clique noutro sítio) fecha o menu
        if (isOpen && !e.currentTarget.contains(e.relatedTarget as Node)) {
          close(false);
        }
      }}
    >
      {/* Botão gatilho */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => (isOpen ? close(false) : setIsOpen(true))}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
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

      {/* Popover */}
      {isOpen && (
        <div
          tabIndex={-1}
          className="absolute left-0 right-auto z-50 mt-1.5 flex w-[300px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl sm:left-auto sm:right-0 sm:w-[340px]"
        >
          {/* Pesquisa: combobox ligado à lista pelo activedescendant */}
          <div className="border-b border-border-ui bg-surface p-2.5">
            <div className="relative flex items-center">
              <Search
                size={14}
                className="pointer-events-none absolute left-2.5 text-muted-content"
                aria-hidden
              />
              <input
                ref={searchInputRef}
                type="text"
                role="combobox"
                aria-label="Pesquisar variáveis"
                aria-expanded={true}
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeOptionId}
                placeholder="Pesquisar variáveis..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleSearchKeyDown}
                className="w-full rounded-lg border border-border-ui bg-surface-raised/50 py-1.5 pl-8 pr-3 text-xs text-primary-content placeholder:text-muted-content outline-none transition-colors focus:border-primary focus:bg-surface focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Lista: só contém opções e grupos */}
          <div
            id={listId}
            role="listbox"
            aria-label="Variáveis dinâmicas disponíveis"
            className="flex max-h-[300px] flex-col gap-3 overflow-y-auto overscroll-contain p-2"
          >
            {filteredContacto.length > 0 && (
              <div
                role="group"
                aria-labelledby={contactGroupId}
                className="flex flex-col gap-1"
              >
                <div
                  id={contactGroupId}
                  className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-content"
                >
                  <User size={12} className="text-primary" aria-hidden />
                  <span>Contacto</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {filteredContacto.map((item, i) => renderOption(item, i))}
                </div>
              </div>
            )}

            <div
              role="group"
              aria-labelledby={customGroupId}
              className="flex flex-col gap-1 border-t border-border-ui/60 pt-2"
            >
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-content">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-500" aria-hidden />
                  <span id={customGroupId}>Personalizadas</span>
                </div>
                {options.personalizadas.length > 0 && (
                  <span className="text-[10px] font-normal normal-case">
                    {filteredPersonalizadas.length}{' '}
                    {filteredPersonalizadas.length === 1
                      ? 'disponível'
                      : 'disponíveis'}
                  </span>
                )}
              </div>

              {options.personalizadas.length === 0 ? (
                <div className="mx-1 my-1 flex items-start gap-2 rounded-xl border border-dashed border-border-ui bg-surface-raised/40 p-2.5 text-left">
                  <HelpCircle
                    size={14}
                    className="mt-0.5 shrink-0 text-muted-content"
                    aria-hidden
                  />
                  <p className="text-[11px] leading-relaxed text-muted-content">
                    As variáveis personalizadas são criadas ao adicionar
                    contactos com campos adicionais (ex: cidade, empresa).
                  </p>
                </div>
              ) : filteredPersonalizadas.length === 0 ? (
                <p className="px-2 py-1 text-[11px] text-muted-content">
                  Nenhuma variável personalizada corresponde à pesquisa.
                </p>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {filteredPersonalizadas.map((item, j) =>
                    renderOption(item, customOffset + j)
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Anúncio de "sem resultados" fora da lista (uma listbox sem opções fica muda) */}
          {noResults && (
            <div
              role="status"
              className="px-4 pb-4 text-center text-xs text-muted-content"
            >
              Nenhuma variável encontrada para &quot;{search}&quot;.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VariablesDropdown;
