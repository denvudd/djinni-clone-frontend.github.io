import React from 'react';
import { Metadata } from 'next';

import PageTitle from '@/components/pagers/PageTitle';
import PageTabs from '@/components/pagers/PageTabs';
import MarketChart from '@/components/statistics/market/MarketChart';
import MarketStatisticsForm from '@/components/forms/MarketStatisticsForm';

import { getMarketStatics } from '@/actions/server/get-market-statistics';
import { getCategories } from '@/actions/get-categories';

import { tabs } from '../tabs';
import { type MarketFilters } from './types';

export interface MarketPageProps {
  searchParams: MarketFilters;
}

const SalariesPage: React.FC<MarketPageProps> = async ({ searchParams }) => {
  const { graphData, djinniIndex } = await getMarketStatics(searchParams);
  const categories = await getCategories();

  return (
    <>
      <div className="mb-4 flex justify-between">
        <PageTitle>Ринок</PageTitle>
        <PageTabs tabs={tabs} active={1} />
      </div>
      <div className="grid-cols-6 gap-4 md:grid">
        <div className="bg-light col-span-4 p-3 md:px-3">
          <MarketChart graphData={graphData} />
        </div>
        <div className="col-span-2 md:px-3">
          <div className="flex grow flex-col gap-0.5 rounded-md border border-gray-300 p-3 text-center">
            Індекс Djinni
            <strong className="text-2xl font-bold">
              {Math.round(djinniIndex) || 'мало даних'}
            </strong>
            кандидатів на вакансію
          </div>
        </div>
      </div>
      <MarketStatisticsForm searchParams={searchParams} categories={categories} />
    </>
  );
};

export default SalariesPage;

export const metadata: Metadata = {
  title: {
    absolute: 'Конкуренція на Джині',
  },
  description: 'Ситуація на ринку праці в IT',
};
