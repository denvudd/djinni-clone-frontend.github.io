import React from 'react';
import Link from 'next/link';

import { getAuthServerSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';

import EmployerProfileForm from '@/components/forms/employer-profile/EmployerProfileForm';
import PageTabs, { PageTabProp } from '@/components/pagers/PageTabs';
import { Separator } from '@/components/ui/Separator';

import { type EmployerProfile } from '@/types';

interface PageProps {
  searchParams: {
    updated: 'ok';
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const { updated } = searchParams;

  const session = await getAuthServerSession();

  if (!session || !session.user?.employer_id) redirect('/');

  async function getEmployer() {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL + `/employer/${session?.user.employer_id}`,
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

      return data as EmployerProfile;
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      redirect('/error');
    }
  }

  const { fullname, positionAndCompany, telegram, phone, linkedIn } =
    await getEmployer();
  const { avatar } = session.user;

  const tabs: PageTabProp = [
    {
      title: 'Мій профіль',
      path: '/home/profile',
    },
    {
      title: 'Про компанію',
      path: '/home/about',
    },
    {
      title: 'Підписки',
      path: '/home/searches',
    },
    {
      title: 'Налаштування',
      path: '/home/settings',
    },
    {
      title: 'Реквізити',
      path: '/home/billing',
    },
  ];
  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Мій профіль</h1>
      <PageTabs tabs={tabs} active={0} />
      <div className="grid lg:grid-cols-3 lg:gap-6">
        <div className="w-full lg:col-span-2">
          <EmployerProfileForm
            fullname={fullname}
            positionAndCompany={positionAndCompany}
            telegram={telegram}
            phone={phone}
            linkedIn={linkedIn}
          />
          <Separator className="mt-12 mb-4" />
          <p>
            <strong>Шукаєте роботу?</strong>{' '}
            <Link href="/account_select" className="text-link">
              Перемкнутися в акаунт кандидата
            </Link>
          </p>
        </div>
        <div className="w-full">214141</div>
      </div>
    </>
  );
};

export default Page;
