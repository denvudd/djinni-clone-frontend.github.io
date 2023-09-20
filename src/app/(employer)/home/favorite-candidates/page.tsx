import DeveloperCard from '@/components/developer-card/DeveloperCard';
import axios from '@/lib/axios';
import { getAuthServerSession } from '@/lib/next-auth';
import { CandidateProfile } from '@/types';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

interface PageProps {}

const Page: React.FC<PageProps> = async ({}) => {
  const session = await getAuthServerSession();

  if (!session || !session.user.employer_id) redirect('/');

  async function getFavoriteCandidates() {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL +
          `/employer/${session?.user.employer_id}/favorite-candidates`,
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

  return (
    <>
      <h1 className="text-3xl leading-5 font-semibold mb-4">
        Кандидати <span className="text-gray">{count}</span>
      </h1>
      <ul
        className="flex relative gap-4 mb-5 flex-wrap before:absolute before:h-[2px] before:left-0 before:bottom-0 
      before:border-b before:border-b-borderColor before:w-full"
      >
        <li>
          <Link
            href="/developers"
            className="text-gray relative border-b-2 border-b-borderColore font-semibold py-2 h-full block"
          >
            Усі
          </Link>
        </li>
        <li>
          <Link
            href="/home/favorite-candidates"
            className="text-dark-gray relative border-b-2 border-b-orange font-semibold py-2 h-full block"
          >
            Збережені
          </Link>
        </li>
      </ul>
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
      </div>
    </>
  );
};

export default Page;
