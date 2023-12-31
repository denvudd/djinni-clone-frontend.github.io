import React from 'react';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import { type Metadata } from 'next';
import { getAuthServerSession } from '@/lib/next-auth';
import { getEmployer } from '@/actions/server/get-employer';

import EmployerProfileForm from '@/components/forms/employer-account/EmployerProfileForm';
import EmployerAvatarForm from '@/components/forms/employer-account/EmployerAvatarForm';
import PageTabs from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';
import { Separator } from '@/components/ui/Separator';
import AlertSuccess from '@/components/ui/AlertSuccess';

import { tabs } from '../tabs';

interface PageProps {
  searchParams: {
    updated: 'ok';
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const { updated } = searchParams;

  const session = await getAuthServerSession();

  if (!session?.user?.employer_id) redirect('/');

  const { fullname, positionAndCompany, telegram, phone, linkedIn } = await getEmployer(
    session.user.employer_id,
  );

  return (
    <>
      <PageTitle>Мій профіль</PageTitle>
      <PageTabs tabs={tabs} active={0} />

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

      <div className="grid gap-6 sm:gap-0 lg:grid-cols-3">
        <div className="w-full lg:col-span-2">
          <EmployerProfileForm
            fullname={fullname}
            positionAndCompany={positionAndCompany}
            telegram={telegram}
            phone={phone}
            linkedIn={linkedIn}
            employerId={session.user.employer_id}
          />
          <Separator className="mb-4 mt-12" />
          <p>
            <strong>Шукаєте роботу?</strong>{' '}
            <Link href="/account_select" className="text-link">
              Перемкнутися в акаунт кандидата
            </Link>
          </p>
        </div>

        <div className="w-full lg:col-span-1">
          <EmployerAvatarForm
            avatar={session.user.avatar}
            fullname={session.user.fullname}
            userId={session.user.id}
            accessToken={session.accessToken}
          />
        </div>
      </div>
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Редагування профілю',
};
