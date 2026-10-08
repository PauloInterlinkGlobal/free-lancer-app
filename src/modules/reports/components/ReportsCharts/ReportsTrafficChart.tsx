'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ITrafficVolumePoint } from '../../interfaces/reports';

interface ReportsTrafficChartProps {
  data: ITrafficVolumePoint[];
}

export function ReportsTrafficChart({ data }: ReportsTrafficChartProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-ui bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-primary-content">
            Volume de Tráfego & Entregas
          </h3>
          <p className="text-xs text-muted-content mt-0.5">
            Evolução diária de mensagens enviadas e entregues
          </p>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient
                id="deliveredGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgb(var(--color-chart-grid, 229 231 235))"
              opacity={0.3}
            />

            <XAxis
              dataKey="date"
              tick={{
                fontSize: 11,
                fill: 'rgb(var(--color-chart-tick, 107 114 128))',
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fontSize: 11,
                fill: 'rgb(var(--color-chart-tick, 107 114 128))',
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid rgb(var(--color-border-ui, 229 231 235))',
                backgroundColor: 'rgb(var(--color-surface, 255 255 255))',
                color: 'rgb(var(--color-text-primary, 17 24 39))',
                fontSize: 12,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              }}
              formatter={(value: any, name: any) => [`${value} SMS`, name]}
              labelFormatter={(label) => `Data: ${label}`}
            />

            <Area
              type="monotone"
              dataKey="sent"
              stroke="#7C3AED"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#sentGradient)"
              name="SMS Enviados"
            />
            <Area
              type="monotone"
              dataKey="delivered"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#deliveredGradient)"
              name="SMS Entregues"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
