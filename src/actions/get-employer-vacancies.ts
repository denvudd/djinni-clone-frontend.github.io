import { type Vacancy } from '@/types';
import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

export const getEmployerVacancies = async (employerId: string) => {
  try {
    const { data } = await axios.get(
      process.env.BACKEND_API_URL + `/employer/${employerId}/vacancies`,
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
