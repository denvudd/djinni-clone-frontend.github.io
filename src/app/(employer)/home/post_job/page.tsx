import React from 'react';
import Link from 'next/link';

import { getAuthServerSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import axios from '@/lib/axios';

import CreateVacancyForm from '@/components/forms/CreateVacancyForm';
import { AxiosError } from 'axios';
import { type Vacancy } from '@/types';

interface PageProps {
  searchParams: {
    job: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const session = await getAuthServerSession();
  const { job } = searchParams;

  if (session && session.user.role !== 'Employer') redirect('/');

  async function getExistVacancy() {
    try {
      if (job) {
        const { data } = await axios.get(`/vacancies/${job}`);

        if (data instanceof AxiosError) {
          if (data.status === 404) {
            redirect('/not-found');
          } else {
            redirect('/error');
          }
        }

        return data as Vacancy;
      }
    } catch (error) {
      redirect('/error');
    }
  }

  const existVacancy = await getExistVacancy();

  return (
    <>
      <h1 className="text-3xl font-semibold">
        <Link href="/home/jobs" className="text-primary">
          Мої вакансії
        </Link>{' '}
        › Нова вакансія
      </h1>
      <div className="flex flex-col">
        <div className="flex-[0_0_83.33333%] max-w-[83.33333%]">
          <CreateVacancyForm
            employerId={session!.user.employer_id!}
            existVacancy={existVacancy}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
