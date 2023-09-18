import { Breadcrumbs } from '@/components/pagers/Breadcrumbs';
import { Vacancy } from '@/types';
import axios, { AxiosError } from 'axios';
import { redirect } from 'next/navigation';
import React from 'react';

interface PageProps {
  params: {
    vacancyId: string;
  };
}

const page: React.FC<PageProps> = async ({ params }) => {
  const { vacancyId } = params;

  async function getVacancy() {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL + `/vacancies/${vacancyId}`,
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
      console.log('[DEV]: ', error);
      redirect('/not-found');
    }
  }

  const vacancy = await getVacancy();

  const segments = [
    {
      title: 'Всі вакансії',
      href: '/jobs',
    },
    {
      title: `${vacancy.category}`,
      href: `/jobs?title=${vacancy.category}`,
    },
    vacancy.city
      ? { title: vacancy.city, href: `/jobs?location=${vacancy.city}` }
      : {
          title: vacancy.companyType,
          href: `/jobs?position=${vacancy.companyType}`,
        },
  ];

  return (
    <>
      <Breadcrumbs segments={segments} />
    </>
  );
};

export default page;
