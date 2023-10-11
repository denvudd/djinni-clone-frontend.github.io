import { EmploymentOption, EnglishLevel } from '@/lib/enums';

export interface DevelopersFilters {
  location: string;
  title: string;
  exp_from: string;
  exp_to: string;
  salary_min: string;
  salary_max: string;
  english_level: EnglishLevel;
  employment_options: EmploymentOption;
  ready_to_relocate: string;
  page: string;
  keywords: string;
}

export type DevelopersFiltersByKey = {
  [key in DevelopersFiltersEnum]: string | EnglishLevel | EmploymentOption;
};

export enum DevelopersFiltersEnum {
  Location = 'location',
  Title = 'title',
  ExpFrom = 'exp_from',
  ExpTo = 'exp_to',
  SalaryMin = 'salary_min',
  SalaryMax = 'salary_max',
  EnglishLevel = 'english_level',
  EmploymentOptions = 'employment_options',
  ReadyToRelocate = 'ready_to_relocate',
  Page = 'page',
  Keywords = 'keywords',
}
