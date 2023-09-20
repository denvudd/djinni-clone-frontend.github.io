import UserAvatar from '@/components/UserAvatar';
import PageTabs, { PageTabProp } from '@/components/pagers/PageTabs';
import { getAuthServerSession } from '@/lib/next-auth';
import { formatEnglishLevel, formatExperience } from '@/lib/utils';
import { EmployerOffer, type Offer } from '@/types';
import axios, { AxiosError } from 'axios';
import { uk } from 'date-fns/locale';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';
import React from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface PageProps {}

const Page: React.FC<PageProps> = async ({}) => {
  const session = await getAuthServerSession();
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
        offers: EmployerOffer[];
        count: number;
      };
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      redirect('/error');
    }
  }

  const { offers, count } = await getOffers();

  console.log(offers);

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
      <PageTabs tabs={tabs} active={0} />
      <h1 className="text-3xl font-semibold my-8">
        Усі відгуки <span className="text-gray">{count}</span>
      </h1>
      <ul className="flex flex-col rounded-lg border border-borderColor">
        {offers &&
          !!offers.length &&
          offers.map((offer) => (
            <li className="p-6 flex items-start gap-4 border-t border-borderColor">
              <div className="flex items-start gap-3 w-full md:flex-[0_0_33.333%] md:max-w-[33.333%]">
                <UserAvatar
                  user={{
                    avatar: offer.candidate.user[0].avatar,
                    fullname: offer.candidate.fullname,
                  }}
                />
                <div className="inline-flex flex-col">
                  <Link
                    href={`/q/${offer.candidateId}`}
                    className="text-primary truncate font-medium"
                  >
                    {offer.candidate.fullname
                      ? offer.candidate.fullname
                      : '(Анонімний кандидат)'}
                  </Link>
                  <p className="text-gray">{offer.candidate.position}</p>
                  <ul className="inline text-gray">
                    <li className="inline text-truncate">
                      від ${offer.candidate.expectations}
                    </li>
                    <span className="mx-1">·</span>
                    <li className="inline text-truncate">
                      {offer.candidate.country}, {offer.candidate.city}
                    </li>
                    <span className="mx-1">·</span>
                    <li className="inline text-truncate">
                      {formatExperience(offer.candidate.experience)}
                    </li>
                    <span className="mx-1">·</span>
                    <li className="inline text-truncate">
                      {formatEnglishLevel(offer.candidate.english).label}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex w-full md:flex-[0_0_77] md:max-w-[77]">
                <Link
                  href={`/home/inbox/${offer.id}`}
                  className="block w-full text-gray"
                >
                  <span className="inline-flex items-center gap-2 float-right ml-4">
                    <Check className="w-4 h-4" />
                    {format(new Date(offer.createdAt), 'PPP', { locale: uk })}
                  </span>
                  <p className="inline hover:text-gray-dark transition-colors">
                    {offer.coverLetter}
                  </p>
                </Link>
              </div>
            </li>
          ))}
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
