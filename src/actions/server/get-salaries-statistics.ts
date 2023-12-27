import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { type SalariesFilters } from '@/app/(finances)/salaries/types';

export interface SalariesGraphData {
  name: string;
  candidates: number;
  vacancies: number;
}

export const getSalariesStatistics = async (searchParams: SalariesFilters) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_API_URL + '/statistics/salaries',
      {
        params: searchParams,
      },
    );

    if (data instanceof AxiosError) {
      if (data.status === 404) {
        redirect('not-found');
      } else {
        throw new Error();
      }
    }

    return data as {
      candidates: {
        count: number;
        totalSum: number;
        fork: { avg: number; min: number; max: number };
      };
      vacancies: {
        count: number;
        totalSum: number;
        fork: { avg: number; min: number; max: number };
      };
      graphData: SalariesGraphData[];
    };
  } catch (error) {
    console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

    redirect('/error');
  }
};
