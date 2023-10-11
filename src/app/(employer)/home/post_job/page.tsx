import React from 'react';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import { type Metadata } from 'next';
import { AxiosError } from 'axios';
import { getAuthServerSession } from '@/lib/next-auth';
import axios from '@/lib/axios';

import CreateVacancyForm from '@/components/forms/CreateVacancyForm';
import PageTitle from '@/components/pagers/PageTitle';

import { type Vacancy } from '@/types';
import { UserRole } from '@/lib/enums';

interface PageProps {
  searchParams: {
    job: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const session = await getAuthServerSession();
  const { job } = searchParams;

  if (session && session.user.role !== UserRole.Employer) redirect('/');

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
      <PageTitle className="mb-0">
        <Link href="/home/jobs" className="text-primary">
          Мої вакансії
        </Link>{' '}
        › Нова вакансія
      </PageTitle>
      <div className="flex flex-col">
        <div className="sm:max-w-[83.33333%] sm:flex-[0_0_83.33333%]">
          <CreateVacancyForm employerId={session!.user.employer_id!} existVacancy={existVacancy} />
        </div>
      </div>
    </>
  );
};

export default Page;

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const session = await getAuthServerSession();
  const { job } = searchParams;

  if (session && session.user.role !== UserRole.Employer) redirect('/');

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

  return {
    title: `Редагувати вакансію ${existVacancy?.name}`,
  };
}
