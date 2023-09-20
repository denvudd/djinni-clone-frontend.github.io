import React from 'react';

import { getAuthServerSession } from '@/lib/next-auth';
import { getCandidatesList } from '@/actions/get-candidate-list';

import SidebarDevelopers from '@/components/SidebarDevelopers';
import DevelopersSearch from '@/components/DevelopersSearch';
import DeveloperCard from '@/components/developer-card/DeveloperCard';
import PageTabs, { type PageTabProp } from '@/components/pagers/PageTabs';

import { type EmploymentOption, type EnglishLevel } from '@/lib/enums';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export interface DevelopersPageProps {
  searchParams: {
    location: string;
    title: string;
    exp_from: string;
    exp_to: string;
    salary_min: string;
    salary_max: string;
    english_level: EnglishLevel;
    employment_options: EmploymentOption;
    ready_to_relocate: string;
    page: string;
    keywords: string;
  };
}

const Page = async ({ searchParams }: DevelopersPageProps) => {
  const { candidates, count } = await getCandidatesList(searchParams);
  const session = await getAuthServerSession();

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
      <h1 className="text-3xl leading-5 font-semibold mb-4">
        Кандидати <span className="text-gray">{count}</span>
      </h1>
      <PageTabs tabs={tabs} active={0} />
      <div className="grid grid-cols-4 gap-4">
        <SidebarDevelopers searchParams={searchParams} />
        <div className="col-span-3 bg-white px-3">
          <DevelopersSearch />
          <div className="flex flex-col gap-4 mt-4">
            {!candidates ||
              (!candidates.length && (
                <p className="flex justify-center text-center text-gray">
                  Кандидатів за заданими параметрами не знайдено.
                </p>
              ))}
            {candidates &&
              !!candidates.length &&
              candidates.map((candidate) => (
                <DeveloperCard
                  id={candidate.id}
                  key={candidate.id}
                  city={candidate.city}
                  country={candidate.country}
                  updatedAt={candidate.updatedAt}
                  createdAt={candidate.createdAt}
                  description={candidate.experienceDescr}
                  expectations={candidate.expectations}
                  experience={candidate.experience}
                  english={candidate.english}
                  skills={candidate.skills}
                  title={candidate.position}
                  views={candidate.views}
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
