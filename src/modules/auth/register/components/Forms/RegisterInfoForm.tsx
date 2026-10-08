import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { Link } from '@/core/i18n/navigation';
import { ArrowRight, Mail, Phone, User } from 'lucide-react';
import { RefObject } from 'react';

interface RegisterInfoFormProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  errors: Record<string, string>;
  isLoading: boolean;
  firstNameRef: RefObject<HTMLInputElement | null>;
  onFirstNameChange: (val: string) => void;
  onLastNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
}

export default function RegisterInfoForm(props: RegisterInfoFormProps) {
  const {
    firstName,
    lastName,
    email,
    phone,
    errors,
    isLoading,
    firstNameRef,
    onFirstNameChange,
    onLastNameChange,
    onEmailChange,
    onPhoneChange,
  } = props;

  return (
    <div className="flex flex-col gap-3.5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input
          ref={firstNameRef}
          label="Primeiro Nome"
          placeholder="Ex: Manuel"
          leftIcon={User}
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          error={errors.firstName}
          disabled={isLoading}
          className="py-2.5"
        />
        <Input
          label="Sobrenome"
          placeholder="Ex: Silva"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          error={errors.lastName}
          disabled={isLoading}
          className="py-2.5"
        />
      </div>

      <Input
        label="Endereço de e-mail profissional"
        placeholder="manuel.silva@empresa.ao"
        type="email"
        leftIcon={Mail}
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        error={errors.email}
        disabled={isLoading}
        autoComplete="email"
        className="py-2.5"
      />

      <Input
        label="Contacto telefónico (opcional)"
        placeholder="+244 923 000 000"
        type="tel"
        leftIcon={Phone}
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        disabled={isLoading}
        className="py-2.5"
      />

      <div className="mt-4 flex flex-col gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isLoading}
          rightIcon={ArrowRight}
        >
          Prosseguir para segurança
        </Button>

        <div className="flex items-center justify-center gap-1.5 pt-1 text-center text-xs text-neutral-600 dark:text-neutral-400">
          <span>Já tem uma conta registada?</span>
          <Link
            href="/login"
            className="font-semibold text-primary  hover:text-primary-280 hover:underline"
          >
            Iniciar sessão
          </Link>
        </div>
      </div>
    </div>
  );
}
