import React from 'react';
import PageTitle from '@/components/pagers/PageTitle';
import { getAuthServerSession } from '@/lib/next-auth';
import { tabs } from '../tabs';
import PageTabs from '@/components/pagers/PageTabs';
import { SalariesFilters } from './types';
import { getPopularCities } from '@/actions/get-popular-cities';
import { getCategories } from '@/actions/get-categories';
import SidebarSalaries from '@/components/salaries-filters/SidebarSalaries';

export interface SalariesPageProps {
  searchParams: SalariesFilters;
}

const SalariesPage: React.FC<SalariesPageProps> = async ({ searchParams }) => {
  const { title, location } = searchParams;

  const cities = await getPopularCities();
  const categories = await getCategories();

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>
          Зарплати {title} {location}
        </PageTitle>
        <PageTabs tabs={tabs} active={0} />
      </div>
      <div className="grid-cols-6 gap-4 md:grid">
        <div className="col-span-2 bg-white md:px-3">
          <SidebarSalaries searchParams={searchParams} categories={categories} cities={cities} />
        </div>
        <div className="col-span-4 bg-white md:px-3">4214124141</div>
      </div>
    </>
  );
};

export default SalariesPage;
