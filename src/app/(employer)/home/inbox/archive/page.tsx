import React from 'react';

import Image from 'next/image';

import { redirect } from 'next/navigation';
import { getAuthServerSession } from '@/lib/next-auth';
import axios, { AxiosError } from 'axios';

import PageTabs, { type PageTabProp } from '@/components/pagers/PageTabs';
import EmployerOffer from '@/components/offers/EmployerOffer';

import { EmployerOffer as EmployerOfferType } from '@/types';
import { RefusalReason } from '@/lib/enums';
import { formatRefusalReason } from '@/lib/utils';

type Refusal = {
  reason: RefusalReason;
  createdAt: Date;
};

const Page: React.FC = async () => {
  const session = await getAuthServerSession();

  if (!session || !session.user.employer_id) redirect('/');
  async function getOffers() {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL +
          `/employer/${session?.user.employer_id}/offers/acrhive`,
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
        offers: ({ refusal: Refusal[] } & EmployerOfferType)[];
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
  ];

  return (
    <div className="-mt-8">
      <PageTabs tabs={tabs} active={1} />
      <h1 className="text-3xl font-semibold my-8">
        Архів <span className="text-gray">{count}</span>
      </h1>
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
              refusal,
            }) => {
              return (
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
                  refusals={refusal}
                  updatedAt={updatedAt}
                  isArchived
                />
              );
            },
          )}
        {offers && !offers.length && (
          <div className="text-center py-12 mx-auto max-w-sm">
            <Image
              src="https://djinni.co/static/images/empty/ill_no_archive.svg"
              width={170}
              height={50}
              alt="No Archive icon"
              className="mx-auto mb-4"
            />
            <h3 className="font-semibold text-2xl mb-2">
              Ті, з ким не відбувся метч
            </h3>
            <p className="text-gray">
              Інколи кандидати вам не підходять. Відмовляйте їм та відправляйте
              в архів, щоб швидше розбирати листування.
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Page;
