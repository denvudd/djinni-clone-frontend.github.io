import axios from 'axios';
import { type City } from '@/types';

export const getPopularCities = async () => {
  try {
    const { data } = await axios.get(`${process.env.BACKEND_API_URL}/countries/popular`);

    return data as City[];
  } catch (error) {
    console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
  }
};
