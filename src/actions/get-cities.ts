import axios from 'axios';
import { type City } from '@/types';

export const getCities = async () => {
  try {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/countries');

    return data as City[];
  } catch (error) {
    console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
  }
};
