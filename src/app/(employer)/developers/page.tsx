import React from 'react';

import { headers } from 'next/headers';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { getAuthServerSession } from '@/lib/next-auth';
import { getEmployerSubscriptions } from '@/actions/private/get-employer-subscriptions';
import { getCandidatesList } from '@/actions/get-candidate-list';
import { getPopularCities } from '@/actions/get-popular-cities';
import { getCategories } from '@/actions/get-categories';

import SidebarDevelopers from '@/components/developers-filters/SidebarDevelopers';
import DevelopersSearch from '@/components/DevelopersSearch';
import DeveloperCard from '@/components/developer-card/DeveloperCard';
import PageTabs, { type PageTabProp } from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';

import { type DevelopersFilters } from './types';
import SheetDevelopers from '@/components/developers-filters/SheetDevelopers';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export interface DevelopersPageProps {
  searchParams: DevelopersFilters;
}

const Page = async ({ searchParams }: DevelopersPageProps) => {
  const headersList = headers();
  const ua = headersList.get('User-Agent') ?? '';
  const { isMobile } = getSelectorsByUserAgent(ua);

  const session = await getAuthServerSession();

  const { candidates, count } = await getCandidatesList(searchParams);
  const cities = await getPopularCities();
  const categories = await getCategories();
  const subscriptions = await getEmployerSubscriptions(session);

  const tabs: PageTabProp = [
    {
      title: 'Усі',
      path: '/developers',
    },
    {
      title: 'Збережені',
      path: '/home/favorite-candidates',
    },
  ];

  return (
    <>
      <PageTitle>
        Кандидати <span className="text-gray">{count}</span>
      </PageTitle>
      <PageTabs tabs={tabs} active={0} />
      <div className="grid-cols-4 gap-4 md:grid">
        {isMobile ? (
          <SheetDevelopers
            subscriptions={subscriptions}
            categories={categories}
            cities={cities}
            {...searchParams}
          />
        ) : (
          <SidebarDevelopers
            subscriptions={subscriptions}
            categories={categories}
            cities={cities}
            searchParams={searchParams}
          />
        )}
        <div className="col-span-3 bg-white md:px-3">
          <DevelopersSearch />
          <div className="mt-4 flex flex-col gap-4">
            {!candidates ||
              (!candidates.length && (
                <p className="text-gray flex justify-center text-center">
                  Кандидатів за заданими параметрами не знайдено.
                </p>
              ))}
            {candidates &&
              !!candidates.length &&
              candidates.map((candidate) => (
                <DeveloperCard
                  {...candidate}
                  title={candidate.position}
                  description={candidate.experienceDescr}
                  key={candidate.id}
                  isFavorite={!!candidate.favoriteCandidates[0]?.employerId}
                  favoriteId={candidate.favoriteCandidates[0]?.id}
                  employerId={session?.user?.employer_id}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;

export async function generateMetadata({ searchParams }: DevelopersPageProps) {
  const { count } = await getCandidatesList(searchParams);

  return {
    title: `Кандидати ${count}`,
    description: `Кандидати на вакансії програмістів, тестувальників та інших IT-спеціалістів. ${count} профілей у пошуку. Анонімний пошук роботи.`,
  };
}
