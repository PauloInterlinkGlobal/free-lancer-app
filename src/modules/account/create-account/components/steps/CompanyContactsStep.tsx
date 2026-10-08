'use client';

import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import {
  ArrowLeft,
  ArrowRight,
  Contact2,
  Globe,
  Mail,
  Phone,
} from 'lucide-react';
import { useCreateAccountStore } from '../../store/useCreateAccountStore';

export function CompanyContactsStep() {
  const { formData, errors, isLoading, setField, nextStep, prevStep } =
    useCreateAccountStore();

  return (
    <div className="space-y-6 min-h-[380px] flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-primary text-primary text-xs font-semibold mb-4">
            <Contact2 className="w-3.5 h-3.5" />
            Tarefa 3 de 5: Canais de Contacto
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Contactos da Empresa
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Indique os canais oficiais de comunicação para receber alertas,
            faturas e validações de segurança.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input
              label="E-mail Empresarial"
              placeholder="contacto@suaempresa.ao"
              type="email"
              leftIcon={Mail}
              value={formData.corporateEmail}
              onChange={(e) => setField('corporateEmail', e.target.value)}
              error={errors.corporateEmail}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div>
            <Input
              label="Contacto Telefónico Principal"
              placeholder="+244 923 000 000"
              type="tel"
              leftIcon={Phone}
              value={formData.phone}
              onChange={(e) => setField('phone', e.target.value)}
              error={errors.phone}
              disabled={isLoading}
              autoComplete="tel"
            />
          </div>

          <div>
            <Input
              label="Website (Opcional)"
              placeholder="https://suaempresa.ao"
              leftIcon={Globe}
              value={formData.website}
              onChange={(e) => setField('website', e.target.value)}
              error={errors.website}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={prevStep}
          disabled={isLoading}
          leftIcon={ArrowLeft}
        >
          Voltar ao Endereço
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => nextStep()}
          isLoading={isLoading}
          rightIcon={ArrowRight}
        >
          Prosseguir para Validação
        </Button>
      </div>
    </div>
  );
}

export default CompanyContactsStep;
