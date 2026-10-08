import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { Link } from '@/core/i18n/navigation';
import { ArrowRight, Mail } from 'lucide-react';
import { RefObject } from 'react';

interface ForgotEmailFormProps {
  email: string;
  emailError?: string;
  isLoading: boolean;
  emailRef: RefObject<HTMLInputElement | null>;
  onEmailChange: (val: string) => void;
}

export default function ForgotEmailForm({
  email,
  emailError,
  isLoading,
  emailRef,
  onEmailChange,
}: ForgotEmailFormProps) {
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

      <div className="mt-6 flex flex-col gap-3">
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isLoading}
          rightIcon={ArrowRight}
        >
          Enviar código de recuperação
        </Button>

        <div className="flex items-center justify-center pt-2 text-center text-xs">
          <Link
            href="/login"
            className="font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Lembrou-se da palavra-passe?{' '}
            <span className="font-semibold text-primary hover:text-primary-300">
              Voltar ao login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
