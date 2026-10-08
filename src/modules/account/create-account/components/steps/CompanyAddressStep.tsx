'use client';

import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { Select } from '@/core/components/Select';
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Globe2,
  MapPin,
  Navigation,
} from 'lucide-react';
import { ANGOLA_PROVINCES } from '../../constants/create-account';
import { useCreateAccountStore } from '../../store/useCreateAccountStore';

export function CompanyAddressStep() {
  const { formData, errors, isLoading, setAddressField, nextStep, prevStep } =
    useCreateAccountStore();

  const address = formData.address || {
    streetAddress: '',
    neighborhood: '',
    city: '',
    country: 'Angola',
  };

  return (
    <div className="space-y-6 min-h-[380px] flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-primary text-primary dark:text-primary-400 text-xs font-semibold mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Tarefa 2 de 5: Localização e Endereço
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Endereço da Empresa
          </h1>
          <p className="mt-2 text-sm text-text-muted leading-relaxed">
            Indique o endereço físico e a sede da sua organização para efeitos
            de conformidade fiscal e faturação.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input
              label="Rua / Avenida e Número"
              placeholder="Ex.: Rua Major Kanhangulo, Edifício B, 4º Andar"
              leftIcon={Navigation}
              value={address.streetAddress}
              onChange={(e) => setAddressField('streetAddress', e.target.value)}
              error={errors.streetAddress}
              disabled={isLoading}
            />
          </div>

          <div>
            <Input
              label="Bairro / Distrito"
              placeholder="Ex.: Ingombota"
              leftIcon={Building}
              value={address.neighborhood}
              onChange={(e) => setAddressField('neighborhood', e.target.value)}
              error={errors.neighborhood}
              disabled={isLoading}
            />
          </div>

          <div>
            <Select
              label="Província"
              placeholder="Selecione a província"
              leftIcon={MapPin}
              options={ANGOLA_PROVINCES}
              value={address.city}
              onChange={(e) =>
                setAddressField('city', e.target?.value ?? String(e))
              }
              error={errors.city}
              disabled={isLoading}
              placement="bottom"
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              label="País"
              placeholder="Ex.: Angola"
              leftIcon={Globe2}
              value={address.country}
              onChange={(e) => setAddressField('country', e.target.value)}
              error={errors.country}
              disabled
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
          Voltar aos Dados
        </Button>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => nextStep()}
          isLoading={isLoading}
          rightIcon={ArrowRight}
        >
          Avançar para Contactos
        </Button>
      </div>
    </div>
  );
}

export default CompanyAddressStep;
