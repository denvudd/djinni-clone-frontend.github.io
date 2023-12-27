/* eslint-disable @typescript-eslint/restrict-template-expressions */

'use client';

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MarketGraphData } from '@/actions/server/get-market-statistics';

interface MarketChartProps {
  graphData: MarketGraphData[];
}

const MarketChart: React.FC<MarketChartProps> = ({ graphData }) => (
  <ResponsiveContainer width="100%" height={360}>
    <LineChart data={graphData}>
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis fontSize={12} />
      <XAxis dataKey="name" stroke="#000" fontSize={12} tickLine={false} axisLine={false} />
      <Tooltip formatter={(value) => [value, 'Кількість: ']} />
      <Legend iconType="plainline" />
      <Line
        type="monotone"
        name="Кандидати"
        dataKey="candidateTotal"
        stroke="#20c997"
        strokeWidth={3}
      />
      <Line
        type="monotone"
        name="Вакансії"
        dataKey="vacancyTotal"
        stroke="#8884d8"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default MarketChart;
