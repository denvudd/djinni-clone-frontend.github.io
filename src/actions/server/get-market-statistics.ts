import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import { MarketFilters } from '@/app/(finances)/market/types';

export interface MarketGraphData {
  name: string;
  candidateTotal: number;
  vacancyTotal: number;
}

export const getMarketStatics = async (searchParams: MarketFilters) => {
  try {
    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_API_URL + '/statistics/market',
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
      djinniIndex: number;
      graphData: MarketGraphData[];
    };
  } catch (error) {
    console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

    redirect('/error');
  }
};
