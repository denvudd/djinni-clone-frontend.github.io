import React from 'react';
import Image from 'next/image';

import { redirect } from 'next/navigation';
import { getAuthServerSession } from '@/lib/next-auth';
import axios, { AxiosError } from 'axios';

import PageTabs, { type PageTabProp } from '@/components/pagers/PageTabs';
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

  if (!session || !session.user.employer_id) redirect('/');
  async function getOffers() {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL +
          `/employer/${session?.user.employer_id}/offers`,
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
    <div className="-mt-8">
      <PageTabs tabs={tabs} active={0} />
      <h1 className="text-3xl font-semibold my-8">
        Усі відгуки <span className="text-gray">{count}</span>
      </h1>
      {error === 'true' && <ErrorAlert />}
      <ul className="flex flex-col rounded-lg border border-borderColor">
        {offers &&
          !!offers.length &&
          offers.map(
            ({
              candidate,
              candidateId,
              updatedAt,
              coverLetter,
              id,
              replies,
              isFavorite,
            }) => (
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
          <div className="text-center py-12 mx-auto max-w-xs">
            <Image
              src="https://djinni.co/static/images/empty/ill_no_unread.svg"
              width={120}
              height={40}
              alt="Favorite icon"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-2xl mb-2">
              Ви все-все прочитали!
            </h3>
            <p className="text-gray">
              І ми вами дуже пишаємось. Мерщій танцювати, чи ще трохи
              попрацюємо?
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Page;
