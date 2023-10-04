import React from 'react';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AxiosError } from 'axios';
import axios from '@/lib/axios';
import { getAuthServerSession } from '@/lib/next-auth';

import AlertSuccess from '@/components/ui/AlertSuccess';
import PageTabs from '@/components/pagers/PageTabs';
import EmployerAboutForm from '@/components/forms/employer-profile/EmployerAboutForm';

import { tabs } from '../tabs';
import { type EmployerProfile } from '@/types';

interface PageProps {
  searchParams: {
    updated: 'ok';
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const { updated } = searchParams;

  const session = await getAuthServerSession();

  if (!session?.user?.employer_id) redirect('/');

  async function getEmployer() {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL + `/employer/${session?.user.employer_id}`,
      );

      if (data instanceof AxiosError) {
        if (data.status === 404) {
          redirect('/not-found');
        } else {
          throw new Error();
        }
      }

      return data as EmployerProfile;
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      redirect('/error');
    }
  }

  const { aboutCompany, dou, companyLink } = await getEmployer();

  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Про компанію</h1>
      <PageTabs tabs={tabs} active={1} />

      {updated === 'ok' && (
        <AlertSuccess
          message={
            <span>
              Профіль оновлено.{' '}
              <Link href={`/r/${session.user.employer_id}`} className="text-link">
                Дивитися на Джині →
              </Link>
            </span>
          }
          className="mb-4"
        />
      )}

      <div className="grid lg:grid-cols-3 lg:gap-6">
        <div className="w-full lg:col-span-2">
          <EmployerAboutForm
            employerId={session.user.employer_id}
            aboutCompany={aboutCompany}
            companyLink={companyLink}
            dou={dou}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
