import axios from 'axios';
import { type Country } from '@/types';

export const getCountries = async () => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_API_URL + '/countries/countries',
    );

    return data as Country[];
  } catch (error) {
    console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
  }
};
