import { CompanyType, EmploymentOption, EnglishLevel, ExpRank } from '@/lib/enums';

export interface JobsFilters {
  location: string;
  title: string;
  exp_level: string;
  salary: string;
  english_level: EnglishLevel;
  employment_options: EmploymentOption;
  page: string;
  primary_keywords: string;
  company_type: CompanyType;
  exp_rank: ExpRank;
}

export enum JobsFiltersEnum {
  Location = 'location',
  Title = 'title',
  ExpLevel = 'exp_level',
  Salary = 'salary',
  EnglishLevel = 'english_level',
  EmploymentOptions = 'employment_options',
  Page = 'page',
  PrimaryKeywords = 'primary_keywords',
  CompanyType = 'company_type',
}
