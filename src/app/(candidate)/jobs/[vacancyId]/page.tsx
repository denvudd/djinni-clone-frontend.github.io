import React from 'react';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { getAuthServerSession } from '@/lib/next-auth';

import EmployerVacancyInfo from '@/components/EmployerVacancyInfo';
import UserAvatar from '@/components/UserAvatar';
import {
  Breadcrumbs,
  type BreadcrumbsSegment,
} from '@/components/pagers/Breadcrumbs';
import { Button, buttonVariants } from '@/components/ui/Button';
import YoutubeEmbed from '@/components/ui/YoutubeEmbed';
import ReactMarkdown from 'react-markdown';
import { MarkdownRender } from '@/components/renderers/MarkdownRender';
import { PenSquare, Users } from 'lucide-react';

import { cn } from '@/lib/utils';
import { type Vacancy } from '@/types';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
interface PageProps {
  params: {
    vacancyId: string;
  };
}

const page: React.FC<PageProps> = async ({ params }) => {
  const { vacancyId } = params;

  const session = await getAuthServerSession();

  async function getVacancy() {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL + `/vacancies/${vacancyId}`,
      );

      if (data instanceof AxiosError) {
        if (data.status === 404) {
          redirect('not-found');
        } else {
          throw new Error();
        }
      }

      return data as Vacancy;
    } catch (error) {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
      redirect('/not-found');
    }
  }

  const {
    active,
    category,
    companyType,
    country,
    createdAt,
    description,
    domain,
    employerId,
    employmentOptions,
    english,
    experience,
    id,
    isRelocate,
    name,
    responsesCount,
    city,
    salaryForkGte,
    salaryForkLte,
    youtube,
    employer,
    clarifiedData,
    keywords,
  } = await getVacancy();

  const segments: BreadcrumbsSegment = [
    {
      title: 'Всі вакансії',
      href: '/jobs',
    },
    {
      title: `${category}`,
      href: `/jobs?title=${category}`,
    },
    city
      ? { title: city, href: `/jobs?location=${city}` }
      : {
          title: companyType,
          href: `/jobs?position=${companyType}`,
        },
  ];

  const isOwner =
    session &&
    session.user.role === 'Employer' &&
    session.user.employer_id === employerId;

  return (
    <>
      <Breadcrumbs segments={segments} />
      <h1 className="text-3xl font-semibold mt-4 mb-2">
        {name}{' '}
        {!active && (
          <span className="text-danger font-normal">(неактивна)</span>
        )}{' '}
        {(salaryForkGte || salaryForkLte) && (
          <span className="text-green">
            ${salaryForkGte}-${salaryForkLte}
          </span>
        )}
      </h1>
      <div className="flex items-center gap-2 text-gray text-sm">
        <Link href={`/r/${employer.id}`}>
          <UserAvatar
            user={{
              avatar: employer.avatar,
              fullname: employer.fullname,
            }}
            className="w-9 h-9"
          />
        </Link>
        {employer.fullname}, {employer.positionAndCompany}
      </div>
      {isOwner && (
        <Link
          href={`/home/post_job?job=${id}`}
          className={cn(
            buttonVariants({
              variant: 'outline',
              className: 'my-6',
            }),
          )}
        >
          Редагувати
        </Link>
      )}
      <div className="w-full flex gap-6">
        <div className="md:flex-[0_0_66.666%] md:max-w-[66.666%]">
          {youtube && <YoutubeEmbed url={youtube} className="mb-4" />}
          <div className="mb-4">
            <ReactMarkdown components={MarkdownRender}>
              {description}
            </ReactMarkdown>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Про компанію</h4>
            {employer.aboutCompany ? (
              <div>{employer.aboutCompany}</div>
            ) : (
              <p className="text-gray">Інформації не додано</p>
            )}
          </div>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Сайт компанії</h4>
            <a
              className="text-link"
              target="_blank"
              href={employer.companyLink}
            >
              {employer.companyLink}
            </a>
          </div>
          {employer.dou && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Компанія на DOU</h4>
              <a className="text-link" target="_blank" href={employer.dou}>
                {employer.dou}
              </a>
            </div>
          )}
          {!active && (
            <div className="mb-4">
              <p className="text-danger font-semibold mb-4">
                Ця вакансія зараз неактивна.
              </p>
              <p>
                Дивитися актуальні вакансії{' '}
                <Link className="text-link" href={`/jobs/title=${category}`}>
                  {category} →
                </Link>
              </p>
            </div>
          )}
        </div>

        <div className="md:flex-[0_0_33.333%] md:max-w-[33.333%]">
          <EmployerVacancyInfo
            category={category}
            city={city}
            country={country}
            clarifiedData={clarifiedData}
            companyType={companyType}
            domain={domain}
            employment={employmentOptions}
            english={english}
            experience={experience}
          />
        </div>
      </div>
      {isOwner && (
        <Link
          href={`/home/post_job?job=${id}`}
          className={cn(
            buttonVariants({
              className: 'my-6 text-lg',
            }),
          )}
        >
          ← Продовжити редагування
        </Link>
      )}
      {active && (
        <div className="flex flex-col gap-1 mt-6 text-gray">
          <p className="inline-flex items-center gap-1">
            <PenSquare className="w-4 h-4" />
            Вакансія опублікована{' '}
            {format(new Date(createdAt), 'PPP', { locale: uk })}
          </p>
          <p className="inline-flex items-center gap-1">
            <Users className="w-4 h-4" />
            {responsesCount} відгуків
          </p>
        </div>
      )}
      {session?.user.role === 'Candidate' && (
        <Button className="text-lg my-6">Відгукнутись</Button>
      )}
    </>
  );
};

export default page;
