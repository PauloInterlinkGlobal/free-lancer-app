import Link from 'next/link';

export default function AuthFooterLinks() {
  return (
    <div className="flex items-center gap-6">
      <Link
        href="/privacy"
        className="rounded-md px-1.5 py-1 text-neutral-500 hover:text-neutral-900 dark:text-slate-400 dark:hover:text-white transition hover:underline"
      >
        Privacidade
      </Link>
      <Link
        href="/terms"
        className="rounded-md px-1.5 py-1 text-neutral-500 hover:text-neutral-900 dark:text-slate-400 dark:hover:text-white transition hover:underline"
      >
        Termos
      </Link>
    </div>
  );
}
