import CandidateInfo from '@/components/CandidateInfo';
import EmployerOfferForm from '@/components/forms/EmployerOfferForm';
import {
  Breadcrumbs,
  type BreadcrumbsSegment,
} from '@/components/pagers/Breadcrumbs';
import { MarkdownRender } from '@/components/renderers/MarkdownRender';
import { Badge } from '@/components/ui/Badge';
import { Button, buttonVariants } from '@/components/ui/Button';
import { getAuthServerSession } from '@/lib/next-auth';
import { cn } from '@/lib/utils';
import { type CandidateProfile } from '@/types';
import axios, { AxiosError } from 'axios';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface PageProps {
  params: {
    candidateId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { candidateId } = params;

  const session = await getAuthServerSession();

  async function getCandidate() {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL + `/candidate/${candidateId}/public`,
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
    session.user.role === 'Candidate' &&
    session.user.candidate_id === candidateId;

  const dialog =
    !!offers &&
    !!offers.length &&
    offers.find((offer) => offer.employerId === session?.user.employer_id);

  const isDialogExist = !!dialog;

  return (
    <>
      <Breadcrumbs segments={segments} />
      <h1 className="text-3xl font-semibold mt-4 mb-2">{position}</h1>
      {isOwner && (
        <div className="text-success mb-3">
          Це ваш публічний профіль на Джині
          <Link
            href="/my/profile"
            className="ml-2 underline inline-block text-link"
          >
            Редагувати
          </Link>
        </div>
      )}

      <div className="w-full flex gap-6">
        <div className="md:flex-[0_0_66.666%] md:max-w-[66.666%]">
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Досвід роботи</h4>
            <ReactMarkdown components={MarkdownRender}>
              {experienceDescr}
            </ReactMarkdown>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Навички</h4>
            <ul className="flex gap-1 flex-wrap items-center">
              {skills.map((skill) => (
                <li key={skill.id}>
                  <Badge
                    className={cn(
                      'pointer-events-none text-sm leading-[1.3] bg-transparent text-dark-gray dark:text-gray border-borderColor font-bold shadow-none',
                    )}
                  >
                    {skill.name}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Досягнення</h4>
            {achievementsDescr ? (
              <ReactMarkdown components={MarkdownRender}>
                {achievementsDescr}
              </ReactMarkdown>
            ) : (
              <p className="text-gray">Інформації не додано</p>
            )}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Очікування від роботи</h4>
            {expectationsDescr ? (
              <ReactMarkdown components={MarkdownRender}>
                {expectationsDescr}
              </ReactMarkdown>
            ) : (
              <p className="text-gray">Інформації не додано</p>
            )}
          </div>
          <div className="mb-10">
            <h4 className="font-semibold mb-2">Мова спілкування</h4>
            {preferableLang === 'Ukrainian' ? 'Українська' : 'English'}
          </div>

          {/* if employer don't have dialog with candidate yet */}
          {!isDialogExist && !isOwner && session?.user.employer_id && (
            <EmployerOfferForm
              employerId={session?.user.employer_id}
              candidateId={id}
            />
          )}

          {/* if employer does have dialog with candidate */}
          {isDialogExist && !isOwner && session?.user.employer_id && (
            <Link
              href={`/home/inbox/${dialog.id}`}
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

        <div className="flex flex-col gap-4 md:flex-[0_0_33.333%] md:max-w-[33.333%]">
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
            <Clock className="w-4 h-4" />
            Опубліковано {format(new Date(updatedAt), 'PPP', { locale: uk })}
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;
