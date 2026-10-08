'use client';

import { Link, usePathname, useRouter } from '@/core/i18n/navigation';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  LogOut,
  Monitor,
  Moon,
  Sun,
  User,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from 'react';

type View = 'menu' | 'language' | 'theme';
type Locale = 'pt' | 'en';

interface UserDropdownProps {
  name: string;
  role: string;
  onLogout: () => void | Promise<void>;
}

const itemBase =
  'w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors';
const itemDefault = `${itemBase} text-content-secondary hover:bg-surface-raised`;

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join('');
}

function IconBox({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center justify-center w-7 h-7 rounded-md bg-surface-raised">
      {children}
    </span>
  );
}

export function UserDropdown({ name, role, onLogout }: UserDropdownProps) {
  const t = useTranslations('nav.userMenu');
  const tPref = useTranslations('nav.preferences');
  const tLang = useTranslations('nav.languages');

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>('menu');
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { theme, setTheme, resolvedTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setOpen(false);
    setView('menu');
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, close]);

  function switchLocale(code: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: code });
    });
    close();
  }

  const isDark = mounted && resolvedTheme === 'dark';

  const themeOptions = [
    { id: 'system', label: tPref('system'), icon: Monitor },
    { id: 'light', label: tPref('light'), icon: Sun },
    { id: 'dark', label: tPref('dark'), icon: Moon },
  ] as const;

  const languages: { code: Locale; label: string }[] = [
    { code: 'pt', label: tLang('pt') },
    { code: 'en', label: tLang('en') },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-item-hover transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
          <span className="text-primary-500 text-xs font-semibold">
            {getInitials(name)}
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-sm font-medium text-text-primary leading-none">
            {name}
          </span>
          <span className="text-xs text-text-muted leading-none mt-0.5">
            {role}
          </span>
        </div>
      </button>

      {/* Painel */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-xl border border-border-ui
            bg-surface shadow-md z-50 overflow-hidden"
        >
          <div className="p-1.5 space-y-0.5">
            {/* Menu principal */}
            {view === 'menu' && (
              <>
                <Link
                  href="/settings/general?section=personal"
                  onClick={close}
                  className={`${itemDefault} gap-2`}
                >
                  <span className="flex items-center gap-2.5">
                    <IconBox>
                      <User size={15} />
                    </IconBox>
                    {t('myAccount')}
                  </span>
                </Link>
                <div className="h-px bg-border-ui my-1" />

                <button
                  onClick={() => setView('language')}
                  className={itemDefault}
                >
                  <span className="flex items-center gap-2.5">
                    <IconBox>
                      <Globe size={15} />
                    </IconBox>
                    {tPref('language')}
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button
                  onClick={() => setView('theme')}
                  className={itemDefault}
                >
                  <span className="flex items-center gap-2.5">
                    <IconBox>
                      {isDark ? <Moon size={15} /> : <Sun size={15} />}
                    </IconBox>
                    {tPref('appearance')}
                  </span>
                  <ChevronRight size={16} />
                </button>

                <div className="h-px bg-border-ui my-1" />

                <button
                  onClick={() => {
                    close();
                    onLogout();
                  }}
                  className={`${itemBase} text-red-500 hover:bg-red-500/10`}
                >
                  <span className="flex items-center gap-2.5">
                    <IconBox>
                      <LogOut size={15} />
                    </IconBox>
                    {t('logout')}
                  </span>
                </button>
              </>
            )}

            {/* Sub-painel: Idioma */}
            {view === 'language' && (
              <>
                <button
                  onClick={() => setView('menu')}
                  className={`${itemDefault} gap-2 justify-start`}
                >
                  <ChevronLeft size={16} />
                  {tPref('language')}
                </button>
                <div className="h-px bg-border-ui my-1" />
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    disabled={isPending}
                    className={`${itemBase} ${
                      locale === lang.code
                        ? 'bg-surface-subtle text-content-primary font-semibold'
                        : 'text-content-secondary hover:bg-surface-raised'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {locale === lang.code && <Check size={14} />}
                  </button>
                ))}
              </>
            )}

            {/* Sub-painel: Aparência */}
            {view === 'theme' && (
              <>
                <button
                  onClick={() => setView('menu')}
                  className={`${itemDefault} gap-2 justify-start`}
                >
                  <ChevronLeft size={16} />
                  {tPref('appearance')}
                </button>
                <div className="h-px bg-border-ui my-1" />
                {themeOptions.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setTheme(id);
                      close();
                    }}
                    className={`${itemBase} ${
                      theme === id
                        ? 'bg-surface-subtle text-content-primary font-semibold'
                        : 'text-content-secondary hover:bg-surface-raised'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={16} />
                      {label}
                    </span>
                    {theme === id && <Check size={14} />}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
