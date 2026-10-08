import { Logo } from '@/core/components/Logo';
import { PreferencesMenu } from '@/core/components/PreferencesMenu';
import { Link } from '@/core/i18n/navigation';
import { LogOut } from 'lucide-react';

import { HEADER_HEIGHT } from '@/core/components/Header/Header';

export function HeaderAccount() {
  return (
    <div className="sticky top-0 z-50 shrink-0 bg-background px-4 pt-4">
      <header
        style={{ height: HEADER_HEIGHT }}
        className="flex items-center justify-between rounded-2xl border border-border-ui bg-surface px-6"
      >
        <div className="flex items-center gap-4">
          <Link href="/create-account" className="flex items-center gap-2">
            <Logo size="sm" className="h-8 w-auto" />
          </Link>
          <span className="hidden h-4 w-px bg-border-ui sm:inline-block" />
        </div>

        <div className="flex items-center gap-3">
          <PreferencesMenu />

          <div className="h-5 w-px bg-border-ui" />

          <Link
            href="/login"
            title="Sair"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-item-hover hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </header>
    </div>
  );
}

export default HeaderAccount;
