import { RefObject } from 'react';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';

interface ForgotNewPasswordFormProps {
  password: string;
  confirmPassword: string;
  errors: Record<string, string>;
  isLoading: boolean;
  passwordRef: RefObject<HTMLInputElement | null>;
  onPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
  onBack: () => void;
}

export default function ForgotNewPasswordForm(
  props: ForgotNewPasswordFormProps
) {
  const {
    password,
    confirmPassword,
    errors,
    isLoading,
    passwordRef,
    onPasswordChange,
    onConfirmPasswordChange,
    onBack,
  } = props;

  const hasLength = password.length >= 8;
  const hasMixed = /[a-zA-Z]/.test(password) && /[0-9]/.test(password);

  return (
    <div className="flex flex-col gap-3.5">
      <Input
        ref={passwordRef}
        label="Nova palavra-passe"
        placeholder="Mínimo 8 caracteres"
        leftIcon={Lock}
        showPasswordToggle
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        error={errors.password}
        disabled={isLoading}
        autoComplete="new-password"
        className="py-2.5"
      />
      <Input
        label="Confirmar nova palavra-passe"
        placeholder="Repita a palavra-passe"
        leftIcon={Lock}
        showPasswordToggle
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e.target.value)}
        error={errors.confirmPassword}
        disabled={isLoading}
        autoComplete="new-password"
        className="py-2.5"
      />

      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-700">
        <p className="font-semibold text-neutral-900">
          Requisitos de segurança:
        </p>
        <div className="mt-2 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <CheckCircle2
              className={`h-3.5 w-3.5 transition-colors ${
                hasLength ? 'text-emerald-600' : 'text-neutral-300'
              }`}
            />
            <span
              className={
                hasLength ? 'text-emerald-600 font-medium' : 'text-neutral-500'
              }
            >
              No mínimo 8 caracteres
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2
              className={`h-3.5 w-3.5 transition-colors ${
                hasMixed ? 'text-emerald-600' : 'text-neutral-300'
              }`}
            />
            <span
              className={
                hasMixed ? 'text-emerald-600 font-medium' : 'text-neutral-500'
              }
            >
              Combinação de letras e números
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 pt-1">
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isLoading}
          rightIcon={ShieldCheck}
        >
          {isLoading ? 'A guardar palavra-passe...' : 'Redefinir palavra-passe'}
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
          Voltar ao código
        </Button>
      </div>
    </div>
  );
}
