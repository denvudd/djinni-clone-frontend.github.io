import React from 'react';

import { redirect } from 'next/navigation';
import { getAuthServerSession } from '@/lib/next-auth';
import axios, { AxiosError } from 'axios';

import DeveloperCard from '@/components/developer-card/DeveloperCard';
import PageTabs, { type PageTabProp } from '@/components/pagers/PageTabs';
import { type CandidateProfile } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {}

const Page: React.FC<PageProps> = async ({}) => {
  const session = await getAuthServerSession();

  if (!session || !session.user.employer_id) redirect('/');

  async function getFavoriteCandidates() {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL +
          `/employer/${session?.user.employer_id}/favorite-candidates`,
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
        id: string;
        count: number;
        favoriteCandidates: ({
          favoriteCandidates: {
            employerId: string;
            id: string;
          }[];
        } & CandidateProfile)[];
      };
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      redirect('/error');
    }
  }

  const { count, favoriteCandidates } = await getFavoriteCandidates();

  const tabs: PageTabProp = [
    {
      title: 'Усі',
      path: '/developers',
    },
    {
      title: 'Збережені',
      path: '/home/favorite-candidates',
    },
  ];

  return (
    <>
      <h1 className="text-3xl leading-5 font-semibold mb-4">
        Кандидати <span className="text-gray">{count}</span>
      </h1>
      <PageTabs tabs={tabs} active={1} />
      <div className="flex flex-col gap-6">
        {favoriteCandidates &&
          !!favoriteCandidates.length &&
          favoriteCandidates.map((candidate) => (
            <DeveloperCard
              id={candidate.id}
              key={candidate.id}
              city={candidate.city}
              country={candidate.country}
              updatedAt={candidate.updatedAt}
              createdAt={candidate.createdAt}
              description={candidate.experienceDescr!}
              expectations={candidate.expectations}
              experience={candidate.experience}
              english={candidate.english}
              skills={candidate.skills}
              title={candidate.position!}
              views={candidate.views}
              isFavorite={!!candidate.favoriteCandidates[0].employerId}
              favoriteId={candidate.favoriteCandidates[0].id}
              employerId={session.user.employer_id}
            />
          ))}
        {favoriteCandidates && !favoriteCandidates.length && (
          <div className="text-center py-12 mx-auto">
            <Image
              src="https://djinni.co/static/images/icons/i-star.svg"
              width={48}
              height={48}
              alt="Favorite icon"
              className="mx-auto"
            />
            <h3 className="font-semibold text-lg">
              Збережіть кандидатів на майбутнє
            </h3>
            <p>
              Після додавання{' '}
              <Link href="/developers" className="text-link">
                кандидатів
              </Link>{' '}
              в обране, ви знайдете їх тут
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
