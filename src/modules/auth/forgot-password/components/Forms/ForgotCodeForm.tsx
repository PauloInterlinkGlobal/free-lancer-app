import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { ArrowLeft, ArrowRight, KeyRound } from 'lucide-react';
import { RefObject } from 'react';

interface ForgotCodeFormProps {
  code: string;
  codeError?: string;
  isLoading: boolean;
  codeRef: RefObject<HTMLInputElement | null>;
  onCodeChange: (val: string) => void;
  onBack: () => void;
}

export default function ForgotCodeForm(props: ForgotCodeFormProps) {
  const { code, codeError, isLoading, codeRef, onCodeChange, onBack } = props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1.5">
        <Input
          ref={codeRef}
          label="Código de verificação (6 dígitos)"
          placeholder="Ex: 123456"
          type="text"
          leftIcon={KeyRound}
          inputMode="numeric"
          maxLength={6}
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          error={codeError}
          disabled={isLoading}
          className="text-center font-mono tracking-widest text-lg py-3"
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
          Validar código
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
          Alterar endereço de e-mail
        </Button>
      </div>
    </div>
  );
}
