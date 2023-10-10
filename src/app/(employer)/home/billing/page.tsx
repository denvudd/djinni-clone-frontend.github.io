import React from 'react';

import { redirect } from 'next/navigation';
import { type Metadata } from 'next';
import axios, { AxiosError } from 'axios';
import { getAuthServerSession } from '@/lib/next-auth';

import AlertSuccess from '@/components/ui/AlertSuccess';
import PageTabs from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';
import EmployerBillingForm from '@/components/forms/employer-profile/EmployerBillingForm';

import { tabs } from '../tabs';
import { EmployerBilling } from '@/types';

interface PageProps {
  searchParams: {
    updated: 'ok';
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const { updated } = searchParams;

  const session = await getAuthServerSession();

  if (!session?.user?.employer_id) redirect('/');

  async function getEmployerBilling() {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + `/employer/${session?.user?.employer_id}/billing`,
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

      return data as EmployerBilling;
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      redirect('/error');
    }
  }

  const employerBilling = await getEmployerBilling();
  const { email: billingEmail, ...employerBillingRest } = employerBilling;

  const isBillingExist = !!employerBilling;

  return (
    <>
      <PageTitle>Реквізити</PageTitle>
      <PageTabs tabs={tabs} active={4} />

      {updated === 'ok' && (
        <AlertSuccess
          message={<span>Ваші реквізити для онлайн-оплати оновлені</span>}
          className="mb-4"
        />
      )}

      <div className="grid lg:grid-cols-3 lg:gap-6">
        <div className="w-full lg:col-span-1">
          <EmployerBillingForm
            employerId={session.user.employer_id}
            email={billingEmail ?? session.user.email}
            isBillingExist={isBillingExist}
            {...employerBillingRest}
          />
        </div>
      </div>
      <p className="mt-6">Ця інформація буде у вашому рахунку про оплату.</p>
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Реквізити',
};
