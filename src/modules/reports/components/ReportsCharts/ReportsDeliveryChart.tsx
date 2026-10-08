'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { IDeliveryStatusItem } from '../../interfaces/reports';

interface ReportsDeliveryChartProps {
  data: IDeliveryStatusItem[];
}

export function ReportsDeliveryChart({ data }: ReportsDeliveryChartProps) {
  const deliveredItem = data.find((d) => d.name === 'Entregues') || data[0];
  const failedItem = data.find((d) => d.name === 'Falhados') || data[1];

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-ui bg-surface p-6 shadow-sm">
      <div>
        <h3 className="text-base font-bold text-primary-content">
          Estado de Entrega
        </h3>
        <p className="text-xs text-muted-content mt-0.5">
          Distribuição do estado das mensagens
        </p>
      </div>

      <div className="relative my-auto flex items-center justify-center py-2">
        <div className="h-48 w-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="transparent"
              >
                {data.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid rgb(var(--color-border-ui, 229 231 235))',
                  backgroundColor: 'rgb(var(--color-surface, 255 255 255))',
                  color: 'rgb(var(--color-text-primary, 17 24 39))',
                  fontSize: 12,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
                formatter={(value: any, name: any) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-col gap-2 border-t border-divider pt-4">
        {failedItem && (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: failedItem.color }}
              />
              <span className="font-medium text-primary-content">
                {failedItem.name}
              </span>
            </div>
            <span className="font-semibold text-primary-content">
              {failedItem.percentage}%
            </span>
          </div>
        )}

        {deliveredItem && (
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: deliveredItem.color }}
              />
              <span className="font-medium text-primary-content">
                {deliveredItem.name}
              </span>
            </div>
            <span className="font-semibold text-primary-content">
              {deliveredItem.percentage}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
