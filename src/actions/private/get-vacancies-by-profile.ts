import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { type ListVacancy } from '@/types';
import { type JobsByProfileFilters } from '@/app/(candidate)/jobs/my/types';

export const getVacanciesByProfile = async (
  candidateId: string,
  params: JobsByProfileFilters,
  accessToken: string,
) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_API_URL + `/vacancies/list/${candidateId}`,
      {
        params: {
          ...params,
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (data instanceof AxiosError) {
      if (data.status === 404) {
        redirect('/not-found');
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
