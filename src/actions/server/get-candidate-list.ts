import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

import { type CandidateProfile } from '@/types';
import { DevelopersFilters } from '@/app/(employer)/developers/types';

export const getCandidatesList = async (searchParams: DevelopersFilters) => {
  try {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/candidate/list', {
      params: {
        ...searchParams,
        limit: 10,
      },
    });

    if (data instanceof AxiosError) {
      if (data.status === 404) {
        redirect('not-found');
      } else {
        throw new Error();
      }
    }

    return data as {
      candidates: ({
        favoriteCandidates: {
          employerId?: string;
          id?: string;
        }[];
      } & CandidateProfile)[];
      count: number;
    };
  } catch (error) {
    console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

    redirect('/error');
  }
};
