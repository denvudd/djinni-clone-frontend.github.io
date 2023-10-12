import React from 'react';
import Link from 'next/link';

import { redirect } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getAuthServerSession } from '@/lib/next-auth';
import axios from '@/lib/axios';

import CandidateInfo from '@/components/CandidateInfo';
import { type CandidateProfile } from '@/types';
import { Separator } from '@/components/ui/Separator';
import { MarkdownRender } from '@/components/renderers/MarkdownRender';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';

const Page: React.FC = async () => {
  const session = await getAuthServerSession();

  if (!session?.user.candidate_id) redirect('/');

  async function fetchFullfilledCandidate(candidateId: string) {
    const { data } = await axios.get(`/candidate/${candidateId}`);

    return data as CandidateProfile;
  }

  const {
    city,
    country,
    employmentOptions,
    english,
    expectations,
    experience,
    category,
    position,
    experienceDescr,
    skills,
    isRelocate,
  } = await fetchFullfilledCandidate(session.user.candidate_id);

  return (
    <div className="flex flex-col">
      <p className="mb-4 text-xl">Джин готовий приступити до пошуку пропозицій! (/◔ ◡ ◔)/</p>
      <div className="mb-10 flex w-full flex-col-reverse gap-6 md:flex-row">
        <div className="md:max-w-[66.666%] md:flex-[0_0_66.666%]">
          <p className="text-gray mb-4">Категорія: {category}</p>
          <div className="mb-4 space-y-2">
            <h2 className="text-2xl font-semibold">{position}</h2>
            <h4 className="font-semibold">Досвід роботи</h4>
            <div>
              <ReactMarkdown components={MarkdownRender}>{experienceDescr}</ReactMarkdown>
            </div>
          </div>
          <h4 className="mb-2 font-semibold">Навички</h4>
          <ul className="flex flex-wrap gap-2">
            {skills?.map((skill) => <li key={skill.id}>{skill.name}</li>)}
          </ul>
        </div>

        <div className="md:max-w-[33.333%] md:flex-[0_0_33.333%]">
          <CandidateInfo
            city={city}
            country={country}
            expectations={expectations}
            english={english}
            employmentOptions={employmentOptions}
            experience={experience}
            isRelocate={isRelocate}
          />
        </div>
      </div>
      <Separator />
      <div className="mt-10 inline-block">
        <Link
          href="/my/profile?publish=true"
          className={cn(buttonVariants({ variant: 'default', className: 'text-lg' }))}
        >
          Опубліковати зараз
        </Link>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <label
          htmlFor="privacy_politics"
          className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Погоджуючись опублікувати свій профіль кандидата, Ви приймаєте{' '}
          <Link href="/help/privacy" className="text-link">
            умови використання сайту
          </Link>
        </label>
      </div>
    </div>
  );
};

export default Page;
