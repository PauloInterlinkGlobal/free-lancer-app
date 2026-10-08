import { RefObject } from 'react';
import { Link } from '@/core/i18n/navigation';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { ArrowLeft, Lock, LogIn } from 'lucide-react';

interface LoginPasswordFormProps {
  password: string;
  passwordError: string;
  isLoading: boolean;
  passwordRef: RefObject<HTMLInputElement | null>;
  onPasswordChange: (value: string) => void;
  onBack: () => void;
}

export default function LoginPasswordForm(props: LoginPasswordFormProps) {
  const {
    password,
    passwordError,
    isLoading,
    passwordRef,
    onPasswordChange,
    onBack,
  } = props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1.5">
        <Input
          ref={passwordRef}
          label="Palavra-passe"
          placeholder="Insira a sua palavra-passe"
          leftIcon={Lock}
          showPasswordToggle
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          error={passwordError}
          disabled={isLoading}
          autoComplete="current-password"
          className="py-3"
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 dark:border-neutral-700 dark:bg-neutral-800 cursor-pointer"
          />
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            Lembrar sessão
          </span>
        </label>

        <Link
          href="/forgot-password"
          className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline transition-colors"
        >
          Esqueceu-se da palavra-passe?
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isLoading}
          rightIcon={LogIn}
        >
          {isLoading ? 'A autenticar...' : 'Entrar na plataforma'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="md"
          fullWidth
          onClick={onBack}
          disabled={isLoading}
          leftIcon={ArrowLeft}
        >
          Trocar de e-mail
        </Button>
      </div>
    </div>
  );
}
