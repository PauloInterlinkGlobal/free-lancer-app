import { HeaderActions } from './HeaderActions';
import { HeaderBreadcrumb } from './HeaderBreadcrumb';
import { HeaderMenuButton } from './HeaderMenuButton';

export const HEADER_HEIGHT = 64;

export function Header() {
  return (
    <div className="sticky top-0 z-50 shrink-0 bg-background px-4 pt-4">
      <header
        style={{ height: HEADER_HEIGHT }}
        className="flex items-center gap-4 rounded-2xl border border-border-ui bg-surface px-4 sm:px-6"
      >
        <HeaderMenuButton />
        <HeaderBreadcrumb />
        <div className="ml-auto">
          <HeaderActions />
        </div>
      </header>
    </div>
  );
}
