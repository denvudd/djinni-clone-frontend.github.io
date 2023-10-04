import axios from 'axios';
import { type Category } from '@/types';

export const getCategories = async () => {
  try {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API_URL + '/categories');

    return data as Category[];
  } catch (error) {
    console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
  }
};
