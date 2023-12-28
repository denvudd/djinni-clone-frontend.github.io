import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import PageTabs from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';
import SidebarJobsByProfile from '@/components/jobs-filters/SidebarJobsByProfile';

import JobCard from '@/components/job-card/JobCard';
import { jobsTabs } from '../tabs';
import { JobsByProfileFilters } from './types';
import { getVacanciesByProfile } from '@/actions/private/get-vacancies-by-profile';
import { getAuthServerSession } from '@/lib/next-auth';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export interface JobsByProfileProps {
  searchParams: JobsByProfileFilters;
}

const Page = async ({ searchParams }: JobsByProfileProps) => {
  const session = await getAuthServerSession();

  if (!session?.user.candidate_id) redirect('/');

  const { vacancies, count } = await getVacanciesByProfile(
    session.user.candidate_id,
    searchParams,
    session.accessToken,
  );

  return (
    <>
      <PageTitle>
        За моїм профілем <span className="text-gray">{count}</span>
      </PageTitle>
      <PageTabs tabs={jobsTabs} active={0} />
      <div className="grid-cols-7 gap-4 md:grid">
        <div className="col-span-5 bg-white">
          <div className="mt-4 flex flex-col gap-8">
            {!vacancies ||
              (!vacancies.length && (
                <p className="text-gray">Немає вакансій за обраними фільтрами :-(</p>
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
        <SidebarJobsByProfile candidateId={session.user.candidate_id} />
      </div>
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Вакансії за моїм профілем',
  description: 'Вакансії – Джин',
};
