import React from 'react';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import { getAuthServerSession } from '@/lib/next-auth';

import { Breadcrumbs, type BreadcrumbsSegment } from '@/components/pagers/Breadcrumbs';
import CandidateInfo from '@/components/CandidateInfo';
import EmployerOfferForm from '@/components/forms/EmployerOfferForm';
import { MarkdownRender } from '@/components/renderers/MarkdownRender';
import { Badge } from '@/components/ui/Badge';

import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { type CandidateProfile } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { PreferableLanguage, UserRole } from '@/lib/enums';

interface PageProps {
  params: {
    candidateId: string;
  };
  searchParams: { msgsent: string };
}

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const { candidateId } = params;
  const { msgsent } = searchParams;

  const session = await getAuthServerSession();

  async function getCandidate() {
    try {
      const { data } = await axios.get(
        `${process.env.BACKEND_API_URL}/candidate/${candidateId}/public`,
      );

      if (data instanceof AxiosError) {
        if (data.status === 404) {
          redirect('/not-found');
        } else {
          throw new Error();
        }
      }

      return data as CandidateProfile;
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      redirect('/not-found');
    }
  }

  const {
    city,
    category,
    country,
    employmentOptions,
    english,
    expectations,
    experience,
    experienceDescr,
    id,
    isRelocate,
    position,
    skills,
    updatedAt,
    achievementsDescr,
    expectationsDescr,
    preferableLang,
    offers,
  } = await getCandidate();

  const segments: BreadcrumbsSegment = [
    {
      title: 'Кандидати',
      href: '/developers',
    },
    {
      title: `${city}`,
      href: `/developers?location=${city}`,
    },
    {
      title: `${category}`,
      href: `/developers?title=${category}`,
    },
  ];

  const isOwner =
    session &&
    session.user.role === UserRole.Candidate &&
    session.user.candidate_id === candidateId;

  const dialog =
    !!offers &&
    !!offers.length &&
    offers.find((offer) => offer.employerId === session?.user.employer_id);

  const isDialogExist = !!dialog;

  return (
    <>
      {msgsent === 'ok' && (
        <Alert className="bg-green-subtle mb-4 md:max-w-[66.666%]">
          <AlertDescription className="text-base">Повідомлення надіслано.</AlertDescription>
        </Alert>
      )}
      <Breadcrumbs segments={segments} />
      <h1 className="mb-2 mt-4 text-3xl font-semibold">{position}</h1>
      {isOwner && (
        <div className="text-success mb-3">
          Це ваш публічний профіль на Джині
          <Link href="/my/profile" className="text-link ml-2 inline-block underline">
            Редагувати
          </Link>
        </div>
      )}

      <div className="flex w-full gap-6">
        <div className="md:max-w-[66.666%] md:flex-[0_0_66.666%]">
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Досвід роботи</h4>
            <ReactMarkdown components={MarkdownRender}>{experienceDescr}</ReactMarkdown>
          </div>
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Навички</h4>
            <ul className="flex flex-wrap items-center gap-1">
              {skills.map((skill) => (
                <li key={skill.id}>
                  <Badge
                    className={cn(
                      'text-dark-gray dark:text-gray border-borderColor pointer-events-none bg-transparent text-sm font-bold leading-[1.3] shadow-none',
                    )}
                  >
                    {skill.name}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Досягнення</h4>
            {achievementsDescr ? (
              <ReactMarkdown components={MarkdownRender}>{achievementsDescr}</ReactMarkdown>
            ) : (
              <p className="text-gray">Інформації не додано</p>
            )}
          </div>
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Очікування від роботи</h4>
            {expectationsDescr ? (
              <ReactMarkdown components={MarkdownRender}>{expectationsDescr}</ReactMarkdown>
            ) : (
              <p className="text-gray">Інформації не додано</p>
            )}
          </div>
          <div className="mb-10">
            <h4 className="mb-2 font-semibold">Мова спілкування</h4>
            {preferableLang === PreferableLanguage.Ukrainian ? 'Українська' : 'English'}
          </div>

          {/* if employer don't have dialog with candidate yet */}
          {!isDialogExist && !isOwner && session?.user.employer_id && (
            <EmployerOfferForm employerId={session?.user.employer_id} candidateId={id} />
          )}

          {/* if employer does have dialog with candidate */}
          {isDialogExist && !isOwner && session?.user.employer_id && (
            <Link
              href={`/home/inbox/${dialog.id}`}
              id="poke_form"
              className={cn(
                buttonVariants({
                  className: 'text-lg',
                }),
              )}
            >
              Відкрити діалог з кандидатом
            </Link>
          )}
        </div>

        <div className="flex flex-col gap-4 md:max-w-[33.333%] md:flex-[0_0_33.333%]">
          <CandidateInfo
            city={city}
            country={country}
            employmentOptions={employmentOptions}
            english={english}
            expectations={expectations}
            experience={experience}
            isRelocate={isRelocate}
          />
          <p className="text-gray inline-flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Опубліковано {format(new Date(updatedAt), 'PPP', { locale: uk })}
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
