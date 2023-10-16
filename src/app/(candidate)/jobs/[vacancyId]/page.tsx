import React from 'react';

import Link from 'next/link';
import { type Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { PenSquare, Users } from 'lucide-react';
import axios from 'axios';

import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { getAuthServerSession } from '@/lib/next-auth';
import { getVacancy } from '@/actions/server/get-vacancy';

import UserAvatar from '@/components/UserAvatar';
import YoutubeEmbed from '@/components/ui/YoutubeEmbed';
import { Button, buttonVariants } from '@/components/ui/Button';
import EmployerVacancyInfo from '@/components/EmployerVacancyInfo';
import { Breadcrumbs, type BreadcrumbsSegment } from '@/components/pagers/Breadcrumbs';
import PageTitle from '@/components/pagers/PageTitle';
import { MarkdownRender } from '@/components/renderers/MarkdownRender';

import { cn } from '@/lib/utils';
import { type Vacancy } from '@/types';
import { UserRole } from '@/lib/enums';
import { getPublicVacancy } from '@/actions/server/get-public-vacancy';

interface PageProps {
  params: {
    vacancyId: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { vacancyId } = params;

  const session = await getAuthServerSession();

  async function getPublicOrPrivateVacancy() {
    if (session?.user.role === UserRole.Candidate) {
      return getPublicVacancy(vacancyId);
    }

    return getVacancy(vacancyId);
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
    name,
    responsesCount,
    city,
    salaryForkGte,
    salaryForkLte,
    youtube,
    employer,
    clarifiedData,
  } = await getPublicOrPrivateVacancy();

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
    session && session.user.role === UserRole.Employer && session.user.employer_id === employerId;

  return (
    <>
      <Breadcrumbs segments={segments} />
      <PageTitle className="mb-2 mt-4">
        {name} {!active && <span className="text-danger font-normal">(неактивна)</span>}{' '}
        {(salaryForkGte ?? salaryForkLte) && (
          <span className="text-green">
            ${salaryForkGte}-${salaryForkLte}
          </span>
        )}
      </PageTitle>
      <div className="text-gray flex items-center gap-2 text-sm">
        <Link href={`/r/${employer.id}`}>
          <UserAvatar
            user={{
              avatar: employer.avatar,
              fullname: employer.fullname,
            }}
            className="h-9 w-9"
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
      <div className="flex w-full gap-6">
        <div className="md:max-w-[66.666%] md:flex-[0_0_66.666%]">
          {youtube && <YoutubeEmbed url={youtube} className="mb-4" />}
          <div className="mb-4">
            <ReactMarkdown components={MarkdownRender}>{description}</ReactMarkdown>
          </div>
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Про компанію</h4>
            {employer.aboutCompany ? (
              <div>{employer.aboutCompany}</div>
            ) : (
              <p className="text-gray">Інформації не додано</p>
            )}
          </div>
          <div className="mb-4">
            <h4 className="mb-2 font-semibold">Сайт компанії</h4>
            <a className="text-link" target="_blank" href={employer.companyLink} rel="noreferrer">
              {employer.companyLink}
            </a>
          </div>
          {employer.dou && (
            <div className="mb-4">
              <h4 className="mb-2 font-semibold">Компанія на DOU</h4>
              <a className="text-link" target="_blank" href={employer.dou} rel="noreferrer">
                {employer.dou}
              </a>
            </div>
          )}
          {!active && (
            <div className="mb-4">
              <p className="text-danger mb-4 font-semibold">Ця вакансія зараз неактивна.</p>
              <p>
                Дивитися актуальні вакансії{' '}
                <Link className="text-link" href={`/jobs/title=${category}`}>
                  {category} →
                </Link>
              </p>
            </div>
          )}
        </div>

        <div className="md:max-w-[33.333%] md:flex-[0_0_33.333%]">
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
        <div className="text-gray mt-6 flex flex-col gap-1">
          <p className="inline-flex items-center gap-1">
            <PenSquare className="h-4 w-4" />
            Вакансія опублікована {format(new Date(createdAt), 'PPP', { locale: uk })}
          </p>
          <p className="inline-flex items-center gap-1">
            <Users className="h-4 w-4" />
            {responsesCount} відгуків
          </p>
        </div>
      )}
      {session?.user.role === UserRole.Candidate && (
        <Button className="my-6 text-lg">Відгукнутись</Button>
      )}
    </>
  );
};

export default Page;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { vacancyId } = params;

  async function getVacancy() {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/vacancies/${vacancyId}`,
    );

    return data as Vacancy;
  }

  const { name } = await getVacancy();

  return {
    title: name,
  };
}
