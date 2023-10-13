import React from 'react';

import { headers } from 'next/headers';
import { Metadata } from 'next';

import { getSelectorsByUserAgent } from 'react-device-detect';
import Link from 'next/link';
import { getAuthServerSession } from '@/lib/next-auth';
import { getCategories } from '@/actions/get-categories';
import { getPopularCities } from '@/actions/get-popular-cities';
import { getVacanciesList } from '@/actions/server/get-vacancies-list';

import PageTabs, { PageTabProp } from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';

import JobCard from '@/components/job-card/JobCard';
import { JobsFilters } from './types';
import SidebarJobs from '@/components/jobs-filters/SidebarJobs';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export interface JobsPageProps {
  searchParams: JobsFilters;
}

const Page = async ({ searchParams }: JobsPageProps) => {
  const headersList = headers();
  const ua = headersList.get('User-Agent') ?? '';
  const { isMobile } = getSelectorsByUserAgent(ua);

  const session = await getAuthServerSession();

  const { vacancies, count } = await getVacanciesList(searchParams);
  const cities = await getPopularCities();
  const categories = await getCategories();

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
        Вакансії на Джині <span className="text-gray">{count}</span>
      </PageTitle>
      <PageTabs tabs={tabs} active={1} />
      <div className="grid-cols-4 gap-4 md:grid">
        <div className="col-span-3 bg-white">
          <div className="mt-4 flex flex-col gap-8">
            {!vacancies ||
              (!vacancies.length && (
                <>
                  <p className="text-gray">Немає вакансій за обраними фільтрами :-(</p>
                  <Link href="/jobs" className="text-link mt-2">
                    Скинути фільтри →
                  </Link>
                </>
              ))}
            {vacancies &&
              !!vacancies.length &&
              vacancies.map((vacancy) => (
                <JobCard
                  city={vacancy.city}
                  companyType={vacancy.companyType}
                  country={vacancy.country}
                  description={vacancy.description}
                  createdAt={vacancy.createdAt}
                  id={vacancy.id}
                  key={vacancy.id}
                  name={vacancy.name}
                  responsesCount={vacancy.responsesCount}
                  views={vacancy.views}
                  isFavorite={!!vacancy.favoriteVacancies[0]?.candidateId}
                  favoriteId={vacancy.favoriteVacancies[0]?.id}
                  employer={vacancy.employer}
                  employmentOptions={vacancy.employmentOptions}
                  english={vacancy.english}
                  experience={vacancy.experience}
                  salaryForkGte={vacancy.salaryForkGte}
                  salaryForkLte={vacancy.salaryForkLte}
                  candidateId={session?.user.candidate_id}
                />
              ))}
          </div>
        </div>
        <SidebarJobs categories={categories} cities={cities} searchParams={searchParams} />
      </div>
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Вакансії на Джині',
  description: 'Вакансії на Джині',
};
