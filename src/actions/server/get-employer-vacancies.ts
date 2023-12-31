import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { type Vacancy } from '@/types';

export const getEmployerVacancies = async (employerId: string) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_API_URL + `/employer/${employerId}/vacancies`,
    );

    if (data instanceof AxiosError) {
      if (data.status === 404) {
        redirect('not-found');
      } else {
        throw new Error();
      }
    }

    return data as Vacancy[];
  } catch (error) {
    console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

    redirect('/error');
  }
};
