'use client';

import { IChartData } from '@/modules/dashboard/interfaces/dashboard';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartLineProps {
  data: IChartData[];
}

export function ChartLine({ data }: ChartLineProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgb(var(--color-chart-grid))"
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: 'rgb(var(--color-chart-tick))' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: 'rgb(var(--color-chart-tick))' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid rgb(var(--color-border-ui))',
            backgroundColor: 'rgb(var(--color-surface))',
            color: 'rgb(var(--color-text-primary))',
            fontSize: 12,
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, color: 'rgb(var(--color-chart-tick))' }}
        />
        <Line
          type="monotone"
          dataKey="enviados"
          stroke="rgb(var(--color-chart-line-primary))"
          strokeWidth={2}
          dot={false}
          name="Enviados"
        />
        <Line
          type="monotone"
          dataKey="entregues"
          stroke="rgb(var(--color-chart-line-secondary))"
          strokeWidth={2}
          dot={false}
          name="Entregues"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
