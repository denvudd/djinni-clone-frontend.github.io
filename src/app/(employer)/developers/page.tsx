import React from 'react';
import Link from 'next/link';

import axios from 'axios';
import { redirect } from 'next/navigation';

import SidebarDevelopers from '@/components/SidebarDevelopers';

import { type EmploymentOption, type EnglishLevel } from '@/lib/enums';
import { type CandidateProfile } from '@/types';

export interface DevelopersPageProps {
  searchParams: {
    location: string;
    title: string;
    exp_from: string;
    exp_to: string;
    salary_min: string;
    salary_max: string;
    english_level: EnglishLevel;
    employment_options: EmploymentOption;
    ready_to_relocate: string;
    page: string;
  };
}

const Page = async ({ searchParams }: DevelopersPageProps) => {
  const {
    employment_options,
    english_level,
    exp_from,
    exp_to,
    location,
    page,
    ready_to_relocate,
    salary_max,
    salary_min,
    title,
  } = searchParams;

  const fetchCandidatesList = async () => {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL + '/candidate/list',
        {
          params: {
            location,
            title,
            exp_from,
            exp_to,
            salary_min,
            salary_max,
            english_level,
            employment_options,
            ready_to_relocate,
            page,
          },
        },
      );

      return data as {
        candidates: CandidateProfile[];
        count: number;
      };
    } catch (error) {
      console.log('[DEV]: ', error);

      redirect('/error');
    }
  };

  const { candidates, count } = await fetchCandidatesList();

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
            className="text-dark-gray relative border-b-2 border-b-orange font-semibold py-2 h-full block"
          >
            Усі
          </Link>
        </li>
        <li>
          <Link
            href="/favorite-candidates"
            className="text-gray relative border-b-2 border-b-borderColor font-semibold py-2 h-full block"
          >
            Збережені
          </Link>
        </li>
      </ul>
      <div className="grid grid-cols-4 gap-4">
        <SidebarDevelopers searchParams={searchParams} />
        <div className="col-span-3 bg-white px-4">content</div>
      </div>
    </>
  );
};

export default Page;
