import React from 'react';
import Link from 'next/link';

import SidebarDevelopers from '@/components/SidebarDevelopers';

import { type EmploymentOption, type EnglishLevel } from '@/lib/enums';
import DevelopersSearch from '@/components/DevelopersSearch';
import DeveloperCard from '@/components/developer-card/DeveloperCard';
import { getCandidatesList } from '@/actions/get-candidate-list';
import { getAuthServerSession } from '@/lib/next-auth';

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

  return (
    <>
      <h1 className="text-3xl leading-5 font-semibold mb-4">
        Кандидати <span className="text-gray">{count}</span>
      </h1>
      <ul
        className="flex relative gap-4 mb-5 flex-wrap before:absolute before:h-[2px] before:left-0 before:bottom-0 
      before:border-b before:border-b-borderColor before:w-full"
      >
        <li>
          <Link
            href="/developers"
            className="text-dark-gray relative border-b-2 border-b-orange font-semibold py-2 h-full block"
          >
            Усі
          </Link>
        </li>
        <li>
          <Link
            href="/home/favorite-candidates"
            className="text-gray relative border-b-2 border-b-borderColor font-semibold py-2 h-full block"
          >
            Збережені
          </Link>
        </li>
      </ul>
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
