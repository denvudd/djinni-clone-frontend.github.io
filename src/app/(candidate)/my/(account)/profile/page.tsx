import React from 'react';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import { type Metadata } from 'next';
import { getAuthServerSession } from '@/lib/next-auth';
import { getCandidateProfile } from '@/actions/private/get-candidate-profile';

import PageTabs from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';
import { Separator } from '@/components/ui/Separator';
import AlertSuccess from '@/components/ui/AlertSuccess';

import { tabs } from '../tabs';
import CandidateProfile from '@/components/forms/candidate-account/CandidateProfile';

interface PageProps {
  searchParams: {
    updated: 'ok';
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const { updated } = searchParams;

  const session = await getAuthServerSession();

  if (!session?.user?.candidate_id) redirect('/');

  const {
    position,
    category,
    skills,
    experience,
    expectations,
    city,
    english,
    experienceDescr,
    achievementsDescr,
    expectationsDescr,
    employmentOptions,
    hourlyRate,
    blockedDomains,
    blockedTypes,
    preferableLang,
    communicateMethod,
    isRelocate,
    employerQuestions,
  } = await getCandidateProfile(session.user.candidate_id);

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
      <PageTabs tabs={tabs} active={0} />

      <div className="grid gap-6 sm:gap-0 lg:grid-cols-3">
        <div className="w-full lg:col-span-2">
          <CandidateProfile
            candidateId={session.user.candidate_id}
            achievementsDescr={achievementsDescr}
            blockedDomains={blockedDomains}
            blockedTypes={blockedTypes}
            category={category}
            city={city}
            communicateMethod={communicateMethod}
            employerQuestions={employerQuestions}
            employmentOptions={employmentOptions}
            english={english}
            expectations={expectations}
            expectationsDescr={expectationsDescr}
            experience={experience}
            experienceDescr={experienceDescr}
            hourlyRate={hourlyRate}
            isRelocate={isRelocate}
            position={position}
            preferableLang={preferableLang}
            skills={skills}
          />
        </div>
      </div>
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Мій профіль',
};
