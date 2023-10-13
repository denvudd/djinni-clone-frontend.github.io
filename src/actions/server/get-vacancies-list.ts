import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

import { ListVacancy } from '@/types';
import { type JobsFilters } from '@/app/(candidate)/jobs/types';

export const getVacanciesList = async (searchParams: JobsFilters) => {
  try {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/vacancies/list', {
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
      vacancies: ListVacancy[];
      count: number;
    };
  } catch (error) {
    console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

    redirect('/error');
  }
};
