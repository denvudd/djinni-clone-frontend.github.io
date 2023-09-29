import React from 'react';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import { getAuthServerSession } from '@/lib/next-auth';

import EmployerWizardStep1 from '@/components/forms/wizard/EmployerWizardStep1';
import { Separator } from '@/components/ui/Separator';

const Page: React.FC = async () => {
  const session = await getAuthServerSession();

  if (!session?.user.employer_id) redirect('/');

  return (
    <>
      <div className="mb-4 leading-5">
        <h2 className="text-2xl font-semibold">Створіть профіль для найму</h2>
        <p className="mt-2">Будь-ласка, заповніть форму, щоб ми перевірили вас та вашу компанію.</p>
      </div>
      <div className="flex">
        <div className="max-w-[60%] flex-[0_0_60%]">
          <EmployerWizardStep1 employerId={session.user.employer_id} />
        </div>
      </div>
      <Separator className="mb-4 mt-12" />
      <p>
        Шукаєте роботу?{' '}
        <Link href="/account_select" className="text-link">
          Перемкнутися в акаунт кандидата
        </Link>
      </p>
    </>
  );
};

export default Page;
