import React from 'react';

import Link from 'next/link';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { getAuthServerSession } from '@/lib/next-auth';

import PageTabs, { PageTabProp } from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';

import JobCard from '@/components/job-card/JobCard';
import { type ListVacancy } from '@/types';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const Page = async () => {
  const session = await getAuthServerSession();

  if (!session?.user.candidate_id) redirect('/');

  async function getFavoriteVacancies() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/candidate/${session?.user.candidate_id}/favorite-vacancies`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );

      if (data instanceof AxiosError) {
        if (data.status === 404) {
          redirect('/not-found');
        } else {
          throw new Error();
        }
      }

      return data as {
        id: string;
        count: number;
        favoriteVacancies: ({
          favoriteVacancies: {
            candidateId: string;
            id: string;
          }[];
        } & ListVacancy)[];
      };
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      redirect('/error');
    }
  }

  const { count, favoriteVacancies } = await getFavoriteVacancies();

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
      <PageTabs tabs={tabs} active={2} />
      <div className="flex flex-col gap-6">
        {favoriteVacancies &&
          !!favoriteVacancies.length &&
          favoriteVacancies.map((vacancy) => (
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
              candidateId={session?.user.candidate_id}
              salaryForkGte={vacancy.salaryForkGte}
              salaryForkLte={vacancy.salaryForkLte}
            />
          ))}
        {favoriteVacancies && !favoriteVacancies.length && (
          <>
            <p className="text-gray mb-1">Немає збережених вакансій.</p>
            <Link href="/jobs" className="text-link">
              Всі вакансії →
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Вакансії на Джині',
  description: 'Вакансії на Джині',
};
