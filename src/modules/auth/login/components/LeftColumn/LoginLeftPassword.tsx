import AccountChip from './AccountChip';

interface LoginLeftPasswordProps {
  email: string;
  onBack: () => void;
}

export default function LoginLeftPassword({
  email,
  onBack,
}: LoginLeftPasswordProps) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
        Bem-vindo(a)
      </h1>
      <AccountChip email={email} onClick={onBack} />
      <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        Para continuar, confirme a sua palavra-passe.
      </p>
    </div>
  );
}
