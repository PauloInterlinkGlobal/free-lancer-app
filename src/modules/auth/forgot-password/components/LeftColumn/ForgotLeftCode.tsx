export default function ForgotLeftCode({ email }: { email: string }) {
  const initial = email.trim().charAt(0).toUpperCase();

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
        Verificar identidade
      </h1>
      <div className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/80 px-3.5 py-1.5 text-xs font-medium text-neutral-900 dark:text-neutral-200">
        <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-primary-500 text-[10px] font-bold text-white">
          {initial}
        </div>
        <span className="max-w-[200px] truncate">{email.trim()}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Introduza o código de verificação de 6 dígitos que enviámos para a sua
        caixa de entrada.
      </p>
    </div>
  );
}
