import React from 'react';
import Image from 'next/image';

import { redirect } from 'next/navigation';
import { type Metadata } from 'next';
import axios, { AxiosError } from 'axios';
import { getAuthServerSession } from '@/lib/next-auth';

import PageTabs, { type PageTabProp } from '@/components/pagers/PageTabs';
import PageTitle from '@/components/pagers/PageTitle';
import EmployerOffer from '@/components/offers/EmployerOffer';

import { EmployerOffer as EmployerOfferType } from '@/types';
import ErrorAlert from '@/components/ui/ErrorAlert';

interface PageProps {
  searchParams: {
    error: string;
  };
}

const Page: React.FC<PageProps> = async ({ searchParams }) => {
  const { error } = searchParams;
  const session = await getAuthServerSession();

  if (!session?.user.employer_id) redirect('/');
  async function getOffers() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/employer/${session?.user.employer_id}/offers`,
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

      return data as {
        offers: EmployerOfferType[];
        count: number;
      };
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      redirect('/error');
    }
  }

  const { offers, count } = await getOffers();

  const tabs: PageTabProp = [
    {
      title: 'Усі відгуки',
      path: '/home/inbox',
    },
    {
      title: 'Архів',
      path: '/home/inbox/archive',
    },
    {
      title: 'Збережене',
      path: '/home/inbox/favorite',
    },
  ];

  return (
    <div className="sm:-mt-8">
      <PageTabs tabs={tabs} active={0} />
      <PageTitle className="sm:my-8">
        Усі відгуки <span className="text-gray">{count}</span>
      </PageTitle>
      {error === 'true' && <ErrorAlert />}
      <ul className="border-borderColor flex flex-col rounded-lg border">
        {offers &&
          !!offers.length &&
          offers.map(
            ({ candidate, candidateId, updatedAt, coverLetter, id, replies, isFavorite }) => (
              <EmployerOffer
                candidateId={candidateId}
                offerId={id}
                employerId={session.user.employer_id!}
                avatar={candidate.user[0].avatar}
                city={candidate.city}
                country={candidate.country}
                coverLetter={coverLetter}
                english={candidate.english}
                expectations={candidate.expectations}
                experience={candidate.experience}
                fullname={candidate.fullname}
                position={candidate.position}
                replies={replies}
                updatedAt={updatedAt}
                isFavorite={isFavorite}
              />
            ),
          )}
        {offers && !offers.length && (
          <div className="mx-auto max-w-xs py-12 text-center">
            <Image
              src="https://djinni.co/static/images/empty/ill_no_unread.svg"
              width={120}
              height={40}
              alt="Favorite icon"
              className="mx-auto mb-4"
            />
            <h3 className="mb-2 text-2xl font-semibold">Ви все-все прочитали!</h3>
            <p className="text-gray">
              І ми вами дуже пишаємось. Мерщій танцювати, чи ще трохи попрацюємо?
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Відгуки',
};
