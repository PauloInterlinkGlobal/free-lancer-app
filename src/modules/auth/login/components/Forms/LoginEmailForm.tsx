import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { Link } from '@/core/i18n/navigation';
import { ArrowRight, Mail } from 'lucide-react';
import { RefObject } from 'react';

interface LoginEmailFormProps {
  email: string;
  emailError: string;
  isLoading: boolean;
  emailRef: RefObject<HTMLInputElement | null>;
  onEmailChange: (value: string) => void;
}

export default function LoginEmailForm({
  email,
  emailError,
  isLoading,
  emailRef,
  onEmailChange,
}: LoginEmailFormProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1.5">
        <Input
          ref={emailRef}
          label="Endereço de e-mail"
          placeholder="nome@empresa.com"
          type="email"
          leftIcon={Mail}
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          error={emailError}
          disabled={isLoading}
          autoComplete="email"
          className="py-3"
        />
      </div>

      <div className="mt-2.5 flex items-center justify-end">
        <Link
          href="/forgot-password"
          className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-300 dark:hover:text-primary-400 hover:underline transition-colors"
        >
          Esqueceu-se da palavra-passe?
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <Button
          type="submit"
          size="md"
          isLoading={isLoading}
          rightIcon={ArrowRight}
          className="w-full !rounded-xl !py-3.5 !text-sm !font-semibold transition-all shadow-lg shadow-primary-500/20 active:scale-[0.99]"
        >
          Continuar
        </Button>

        <div className="flex items-center justify-center gap-1.5 pt-2 text-center text-xs text-neutral-600 dark:text-neutral-400">
          <span>Ainda não tem conta?</span>
          <Link
            href="/register"
            className="font-semibold text-primary dark:hover:text-primary-300 hover:underline"
          >
            Criar conta gratuita
          </Link>
        </div>
      </div>
    </div>
  );
}
