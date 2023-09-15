import React from 'react';
import Link from 'next/link';
import { getAuthServerSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import CreateVacancyForm from '@/components/forms/CreateVacancyForm';

const Page: React.FC = async ({}) => {
  const session = await getAuthServerSession();

  if (session && session.user.role !== 'Employer') redirect('/');

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
          <CreateVacancyForm employerId={session!.user.employer_id!} />
        </div>
      </div>
    </>
  );
};

export default Page;
