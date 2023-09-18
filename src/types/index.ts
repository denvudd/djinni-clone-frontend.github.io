import {
  CommunicateMethod,
  CompanyType,
  EmploymentOption,
  EnglishLevel,
  PreferableLanguage,
} from '@/lib/enums';

export interface Category {
  name: string;
  subcategories: {
    id: number;
    name: string;
  }[];
}

export interface Domain {
  id: number;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface City {
  city: string;
  admin_name: string;
}

export interface CandidateProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;

  fullname?: string;
  expectations: number;
  country: string;
  city: string;
  isRelocate: boolean;
  experience: number;
  views: number;

  category?: string;
  hourlyRate?: number;
  position?: string;
  experienceDescr?: string;
  expectationsDescr?: string;
  achievementsDescr?: string;
  employerQuestions?: string;

  preferableLang?: PreferableLanguage;
  english: EnglishLevel;
  employmentOptions: EmploymentOption;
  communicateMethod: CommunicateMethod;

  skype?: string;
  phone?: string;
  telegram?: string;
  whatsApp?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  resumeFile?: null;

  skills: Skill[];
  // blockedDomains: [];
  // blockedTypes: [];
}

export interface EmployerProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;

  fullname?: string;
  companyName?: string;
  positionAndCompany?: string;
  telegram?: string;
  linkedIn?: string;
  companyLink?: string;
  dou?: string;
  phone?: string;
  aboutCompany?: string;
  filled?: string;

  vacancies: Vacancy[];
  // offers    Offer[]
}

export interface Vacancy {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  employerId: string;

  active: boolean;
  responsesCount: number;
  name: string;
  domain: string;
  description: string;
  category: string;
  employmentOptions: EmploymentOption;
  country: string;
  city?: string;
  isRelocate: boolean;

  salaryForkGte?: number;
  salaryForkLte?: number;
  privateSalaryForkGte: number;
  privateSalaryForkLte: number;

  experience: number;
  english: EnglishLevel;
  youtube?: string;

  companyType: CompanyType;
  // clarifiedData: ClarifiedData[];
  // keywords: VacancyKeyword[];
}
