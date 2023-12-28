import React from 'react';

import { Metadata } from 'next';

import PageTabs, { PageTabProp } from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export interface JobsPageProps {
  searchParams: never[];
}

const Page = ({ searchParams }: JobsPageProps) => {
  const tabs: PageTabProp = [
    {
      title: 'Для мене',
      path: '/jobs/my',
    },
    {
      title: 'Всі',
      path: '/jobs',
    },
    {
      title: 'Збережені',
      path: '/jobs/my-favorites',
    },
  ];

  return (
    <>
      <PageTitle>
        Вакансії на Джині <span className="text-gray">0</span>
      </PageTitle>
      <PageTabs tabs={tabs} active={1} />
      <div className="grid-cols-4 gap-4 md:grid">
        <div className="col-span-3 bg-white" />
      </div>
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Вакансії на Джині',
  description: 'Вакансії на Джині',
};
