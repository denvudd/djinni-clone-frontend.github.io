import React from 'react';

import { EmploymentOption, EnglishLevel } from '@/lib/enums';

interface PageProps {
  searchParams: {
    location: string;
    title: string;
    exp_from: string;
    exp_to: string;
    salary_min: string;
    salary_max: string;
    english_level: EnglishLevel;
    employment: EmploymentOption;
    ready_to_relocate: string;
    page: string;
  };
}

const Page: React.FC<PageProps> = ({}) => {
  return <div>page</div>;
};

export default Page;
