import React from 'react';

import { getAuthServerSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import axios from '@/lib/axios';

import CandidateInfo from '@/components/CandidateInfo';
import { type CandidateProfile } from '@/types';
import { Separator } from '@/components/ui/Separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

const Page: React.FC = async ({}) => {
  const session = await getAuthServerSession();

  if (!session || !session.user.candidate_id) redirect('/');

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
      <p className="text-xl mb-4">
        Джин готовий приступити до пошуку пропозицій! (/◔ ◡ ◔)/
      </p>
      <div className="w-full flex gap-6 mb-10">
        <div className="md:flex-[0_0_66.666%] md:max-w-[66.666%]">
          <p className="text-gray mb-4">Категорія: {category}</p>
          <div className="space-y-2 mb-4">
            <h2 className="text-2xl font-semibold">{position}</h2>
            <h4 className="font-semibold">Досвід роботи</h4>
            <p>{experienceDescr}</p>
          </div>
          <h4 className="font-semibold mb-2">Навички</h4>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill.id}>{skill.name}</li>
            ))}
          </ul>
        </div>

        <div className="md:flex-[0_0_33.333%] md:max-w-[33.333%]">
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
      <div className="inline-block mt-10">
        <Link
          href="/my/profile?publish=true"
          className={cn(
            buttonVariants({ variant: 'default', className: 'text-lg' }),
          )}
        >
          Опубліковати зараз
        </Link>
      </div>
      <div className="flex items-center space-x-2 mt-4">
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
