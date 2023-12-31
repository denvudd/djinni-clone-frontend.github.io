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
import { RefusalReason } from '@/lib/enums';

interface Refusal {
  reason: RefusalReason;
  createdAt: Date;
}

const Page: React.FC = async () => {
  const session = await getAuthServerSession();

  if (!session?.user.employer_id) redirect('/');
  async function getArchiveOffers() {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/employer/${session?.user.employer_id}/offers/archive`,
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

  const { offers, count } = await getArchiveOffers();

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
      <PageTabs tabs={tabs} active={1} />
      <PageTitle className="sm:my-8">
        Архів <span className="text-gray">{count}</span>
      </PageTitle>
      <ul className="border-borderColor flex flex-col rounded-lg border">
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
                refusals={refusal}
                updatedAt={updatedAt}
                isArchived
                isFavorite={isFavorite}
              />
            ),
          )}
        {offers && !offers.length && (
          <div className="mx-auto max-w-sm py-12 text-center">
            <Image
              src="https://djinni.co/static/images/empty/ill_no_archive.svg"
              width={170}
              height={50}
              alt="No Archive icon"
              className="mx-auto mb-4"
            />
            <h3 className="mb-2 text-2xl font-semibold">Ті, з ким не відбувся метч</h3>
            <p className="text-gray">
              Інколи кандидати вам не підходять. Відмовляйте їм та відправляйте в архів, щоб швидше
              розбирати листування.
            </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Page;

export const metadata: Metadata = {
  title: 'Архів відгуків',
};
