import {
  CommunicateMethod,
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
  userId: string;

  fullname?: string;
  expectations: number;
  country: string;
  city: string;
  isRelocate: boolean;
  experience: number;

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
  blockedDomains: [];
  blockedTypes: [];
}
