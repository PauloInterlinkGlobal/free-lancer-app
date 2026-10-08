'use client';

import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { Select } from '@/core/components/Select';
import { ArrowRight, Briefcase, Building2, FileText } from 'lucide-react';
import { SECTORS } from '../../constants/create-account';
import { useCreateAccountStore } from '../../store/useCreateAccountStore';

export function CompanyDataStep() {
  const { formData, errors, isLoading, setField, nextStep } =
    useCreateAccountStore();

  return (
    <div className="space-y-6 min-h-[380px] flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-primary text-primary text-xs font-semibold mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            Tarefa 1 de 5: Dados da Empresa
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Identificação da Empresa
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Introduza os dados legais e operacionais da sua empresa para
            conformidade e registo de remetente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input
              label="Nome da Empresa"
              placeholder="Ex.: SMSillico Soluções Digitais Lda."
              leftIcon={Building2}
              value={formData.companyName}
              onChange={(e) => setField('companyName', e.target.value)}
              error={errors.companyName}
              disabled={isLoading}
            />
          </div>

          <div>
            <Input
              label="NIF / Identificação Fiscal"
              placeholder="Ex.: 500123456"
              leftIcon={FileText}
              value={formData.taxId}
              onChange={(e) => setField('taxId', e.target.value)}
              error={errors.taxId}
              disabled={isLoading}
            />
          </div>

          <div>
            <Select
              label="Sector de Actividade"
              placeholder="Selecione o sector"
              leftIcon={Briefcase}
              options={SECTORS}
              value={formData.sector}
              onChange={(e) => setField('sector', e.target?.value ?? String(e))}
              error={errors.sector}
              disabled={isLoading}
              placement="bottom"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 flex items-center justify-end">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => nextStep()}
          isLoading={isLoading}
          rightIcon={ArrowRight}
        >
          Avançar para Endereço
        </Button>
      </div>
    </div>
  );
}

export default CompanyDataStep;
