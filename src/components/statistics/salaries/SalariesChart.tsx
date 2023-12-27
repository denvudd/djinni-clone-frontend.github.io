/* eslint-disable @typescript-eslint/restrict-template-expressions */

'use client';

import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { SalariesGraphData } from '@/actions/server/get-salaries-statistics';

interface SalariesChartProps {
  graphData: SalariesGraphData[];
}

const SalariesChart: React.FC<SalariesChartProps> = ({ graphData }) => (
  <ResponsiveContainer width="100%" className="bg-light rounded-md p-4" height={280}>
    <BarChart data={graphData}>
      <XAxis dataKey="name" stroke="#000" fontSize={12} tickLine={false} axisLine={false} />
      <Tooltip formatter={(value) => `$${value}`} />
      <Bar dataKey="candidates" fill="#20c997" />
      <Bar dataKey="vacancies" fill="#198754" />
    </BarChart>
  </ResponsiveContainer>
);

export default SalariesChart;
