import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { type EmployerProfile } from '@/types';

export const getEmployer = async (employerId: string) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_API_URL + `/employer/${employerId}`,
    );

    if (data instanceof AxiosError) {
      if (data.status === 404) {
        redirect('/not-found');
      } else {
        throw new Error();
      }
    }

    return data as EmployerProfile;
  } catch (error) {
    console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

    redirect('/error');
  }
};
