import React from 'react';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import { type Metadata } from 'next';
import { getAuthServerSession } from '@/lib/next-auth';
import { getCandidateProfile } from '@/actions/private/get-candidate-profile';

import PageTabs from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';
import AlertSuccess from '@/components/ui/AlertSuccess';
import CandidateAccount from '@/components/forms/candidate-account/CandidateAccount';
import CandidateAvatarForm from '@/components/forms/candidate-account/CandidateAvatarForm';

import { tabs } from '../tabs';

interface PageProps {
  searchParams: {
    updated: 'ok';
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const { updated } = searchParams;

  const session = await getAuthServerSession();

  if (!session?.user?.candidate_id) redirect('/');

  const { fullname, skype, phone, telegram, whatsApp, linkedIn, github, portfolio } =
    await getCandidateProfile(session.user.candidate_id);

  return (
    <>
      {updated === 'ok' && (
        <AlertSuccess
          message={
            <span>
              Профіль оновлено.{' '}
              <Link href="/jobs/my" className="text-link">
                Дивитись вакансії для мене →
              </Link>
            </span>
          }
          className="mb-4"
        />
      )}
      <PageTitle>Мій акаунт</PageTitle>
      <Link href={`/q/${session.user.candidate_id}`} className="text-link my-2 inline-block">
        Дивитися публічний профіль
      </Link>
      <PageTabs tabs={tabs} active={1} />

      <div className="flex w-full flex-col gap-4 lg:col-span-2">
        <div className="text-xl">
          <p>Пошук роботи на Джині анонімний.</p>
          <p>Ваші персональні дані побачать лише ті, кому ви відкриєте контакти.</p>
        </div>

        <div className="grid gap-6 sm:gap-0 lg:grid-cols-3">
          <div className="w-full lg:col-span-2">
            <CandidateAccount
              candidateId={session.user.candidate_id}
              accessToken={session.accessToken}
              fullname={fullname}
              email={session.user.email}
              github={github}
              linkedIn={linkedIn}
              phone={phone}
              portfolio={portfolio}
              skype={skype}
              telegram={telegram}
              whatsApp={whatsApp}
            />
          </div>

          <div className="w-full lg:col-span-1">
            <CandidateAvatarForm
              avatar={session.user.avatar}
              fullname={session.user.fullname}
              userId={session.user.id}
              accessToken={session.accessToken}
            />
          </div>
        </div>
        <Link href="/remind" className="text-link mt-8">
          Скидання паролю →
        </Link>
      </div>
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Мій профіль',
};
