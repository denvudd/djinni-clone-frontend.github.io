import { redirect } from 'next/navigation';

import { AxiosError } from 'axios';
import axios from '@/lib/axios';

import { type Vacancy } from '@/types';

export async function getVacancy(jobId: string) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/vacancies/${jobId}`,
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
