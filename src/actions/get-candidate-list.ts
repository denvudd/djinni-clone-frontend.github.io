import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

import { type CandidateProfile } from '@/types';
import { type DevelopersPageProps } from '@/app/(employer)/developers/page';

export const getCandidatesList = async (
  searchParams: DevelopersPageProps['searchParams'],
) => {
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
    keywords,
  } = searchParams;

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
          keywords,
          limit: 10,
        },
      },
    );

    if (data instanceof AxiosError) {
      if (data.status === 404) {
        throw new Error('404 Not Found');
      } else {
        throw new Error();
      }
    }

    return data as {
      candidates: CandidateProfile[];
      count: number;
    };
  } catch (error) {
    console.log('[DEV]: ', error);

    redirect('/error');
  }
};