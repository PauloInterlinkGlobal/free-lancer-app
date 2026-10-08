'use client';

import { IOperatorStatItem } from '../../interfaces/reports';

interface ReportsOperatorsCardProps {
  operators: IOperatorStatItem[];
}

export function ReportsOperatorsCard({ operators }: ReportsOperatorsCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-ui bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-primary-content">
            Desempenho por Operadora
          </h3>
          <p className="text-xs text-muted-content mt-0.5">
            Volume e taxa de entrega por rede (Angola)
          </p>
        </div>
      </div>

      <div className="my-auto flex flex-col gap-4 py-3">
        {operators.map((op) => (
          <div key={op.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: op.color }}
                />
                <span className="font-semibold text-primary-content">
                  {op.name}
                </span>
                <span className="text-[11px] text-muted-content">
                  ({op.totalSent} SMS)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-emerald-500">
                  {op.deliveryRate}% entrega
                </span>
                <span className="font-bold text-primary-content">
                  {op.percentage}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-raised">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${op.percentage}%`,
                  backgroundColor: op.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-divider pt-3 text-[11px] text-muted-content">
        <span>Total Cobertura Nacional</span>
        <span className="font-semibold text-emerald-500">
          98.4% Taxa Média Global
        </span>
      </div>
    </div>
  );
}
