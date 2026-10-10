import { Check } from 'lucide-react';

const STEPS = [
  { title: 'Upload', description: 'Carregue a lista' },
  { title: 'Mapeamento', description: 'Associe as colunas' },
  { title: 'Revisão', description: 'Confirme e importe' },
];

const TIPS = [
  'Os números devem começar por 244. Verificamos tudo assim que carregar o ficheiro.',
  'Telemóvel e Nome são obrigatórios. As restantes colunas viram variáveis para as suas mensagens.',
  'Linhas inválidas ou duplicadas não são importadas. Poderá descarregar o relatório de erros no fim.',
];

interface ImportStepIndicatorProps {
  current: number;
  summaries?: (string | undefined)[];
}

export function ImportStepIndicator({
  current,
  summaries = [],
}: ImportStepIndicatorProps) {
  return (
    <aside className="flex shrink-0 flex-col gap-8 rounded-3xl bg-primary p-6 text-white lg:w-72">
      <div className="flex flex-col gap-2">
        <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest">
          Contactos
        </span>
        <h2 className="text-2xl font-bold leading-tight">Importar contactos</h2>
      </div>

      <ol className="flex list-none flex-col p-0">
        {STEPS.map((step, index) => {
          const done = index < current;
          const active = index === current;
          const last = index === STEPS.length - 1;
          const summary = done || active ? summaries[index] : undefined;

          return (
            <li
              key={step.title}
              aria-current={active ? 'step' : undefined}
              className="flex gap-3"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    active
                      ? 'bg-white text-primary'
                      : done
                        ? 'bg-white/25 text-white'
                        : 'border border-white/40 text-white/70'
                  }`}
                >
                  {done ? <Check size={18} aria-hidden /> : index + 1}
                </span>
                {!last && (
                  <span
                    aria-hidden
                    className={`my-1.5 min-h-10 w-0.5 flex-1 ${
                      done ? 'bg-white/70' : 'bg-white/20'
                    }`}
                  />
                )}
              </div>

              <div className="flex min-w-0 flex-col gap-0.5 pb-4 pt-1.5">
                <span
                  className={`text-base ${
                    active ? 'font-bold' : 'font-semibold text-white/80'
                  }`}
                >
                  {step.title}
                </span>
                <span className="truncate text-xs text-white/70">
                  {summary ?? step.description}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-auto hidden flex-col gap-1.5 rounded-2xl bg-white/10 p-4 lg:flex">
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/80">
          Dica
        </span>
        <p className="text-sm leading-snug text-white/90">{TIPS[current]}</p>
      </div>
    </aside>
  );
}
