import React from 'react';

import { redirect } from 'next/navigation';
import { type Metadata } from 'next';
import axios, { AxiosError } from 'axios';
import { getAuthServerSession } from '@/lib/next-auth';

import AlertSuccess from '@/components/ui/AlertSuccess';
import PageTabs from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';
import EmployerSubscribeForm from '@/components/forms/employer-profile/EmployerSubscribeForm';
import EmployerSubscriptionsList from '@/components/EmployerSubscriptionsList';

import { tabs } from '../tabs';
import { EmployerSubscribe } from '@/types';

interface PageProps {
  searchParams: {
    subscription_saved: 'ok';
    subscription_deleted: 'ok';
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const { subscription_saved, subscription_deleted } = searchParams;

  const session = await getAuthServerSession();

  if (!session?.user?.employer_id) redirect('/');

  async function getEmployerSubscriptions() {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL +
          `/employer/${session?.user?.employer_id}/subscriptions`,
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

      return data as EmployerSubscribe[];
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      redirect('/error');
    }
  }

  const subscriptions = await getEmployerSubscriptions();

  return (
    <>
      <PageTitle>Підписки</PageTitle>
      <PageTabs tabs={tabs} active={2} />

      {subscription_saved === 'ok' && (
        <AlertSuccess message={<span>Підписку додано.</span>} className="mb-4" />
      )}

      {subscription_deleted === 'ok' && (
        <AlertSuccess message={<span>Підписку видалено.</span>} className="mb-4" />
      )}

      <div className="grid lg:grid-cols-3 lg:gap-6">
        <div className="w-full lg:col-span-2">
          <h4 className="mb-2 font-semibold">Мої підписки</h4>
          {!subscriptions.length && <p>У вас поки що немає підписок</p>}
          {!!subscriptions.length && (
            <EmployerSubscriptionsList
              subscriptions={subscriptions}
              employerId={session.user.employer_id}
            />
          )}
          <EmployerSubscribeForm employerId={session.user.employer_id} />
        </div>
      </div>
    </>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Мої підписки',
};
