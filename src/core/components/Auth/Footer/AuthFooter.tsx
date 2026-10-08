import LanguageSelector from './LanguageSelector';
import AuthFooterLinks from './AuthFooterLinks';

export default function AuthFooter() {
  return (
    <footer className="mt-6 flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-4 text-xs text-neutral-500 dark:text-slate-400 sm:flex-row sm:px-6">
      <div className="flex items-center justify-start w-full sm:w-auto">
        <LanguageSelector />
      </div>
      <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
        <AuthFooterLinks />
      </div>
    </footer>
  );
}
