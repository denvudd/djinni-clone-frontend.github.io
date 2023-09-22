import {
  ClarifiedDataEnum,
  CommunicateMethod,
  CompanyType,
  EmploymentOption,
  EnglishLevel,
  PreferableLanguage,
  RefusalReason,
  UserRole,
} from '@/lib/enums';
import { User } from 'next-auth';

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
  position: string;
  experienceDescr: string;
  expectationsDescr?: string;
  achievementsDescr?: string;
  employerQuestions?: string;

  preferableLang: PreferableLanguage;
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
  offers?: Offer[];
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
  clarifiedData: ClarifiedData[];
  keywords: VacancyKeyword[];

  employer: {
    id: string;
    companyLink: string;
    aboutCompany: string;
    dou?: string;
    fullname: string;
    positionAndCompany: string;
    avatar: string | null;
  };
}

export interface EmployerOffer {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  vacancyId: null;
  coverLetter: string;
  employerId: string;
  candidateId: string;
  active: boolean;
  isArchive: boolean;
  refusal: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    message: string;
    reason: RefusalReason;
    offerId: string;
    employerId: string;
    candidateId: string;
  }[];
  replies: {
    text: string;
    updatedAt: Date;
  }[];
  candidate: {
    fullname: string | null;
    position: string;
    expectations: number;
    country: string;
    city: string;
    experience: number;
    english: EnglishLevel;
    user: {
      email: string;
      avatar: string | null;
    }[];
  };
}

export interface ExtendedEmployerOffer {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  vacancyId: null;
  coverLetter: string;
  employerId: string;
  candidateId: string;
  active: boolean;
  isArchive: boolean;
  replies?: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    text: string;
    authorId: string;
    replyToId?: string;
    offerId: string;
    author: {
      email: string;
      avatar: string | null;
      role: UserRole;
      id: string;
      employer_info?: {
        id: string;
        fullname: string;
      };
      candidate_info?: {
        id: string;
        fullname: string;
      };
    };
  }[];
  candidate: {
    fullname: string | null;
    position: string;
    expectations: number;
    country: string;
    city: string;
    experience: number;
    english: EnglishLevel;
    preferableLang: PreferableLanguage;
    communicateMethod: CommunicateMethod;
    skype?: string;
    github?: string;
    linkedIn?: string;
    telegram?: string;
    whatsApp?: string;
    user: {
      email: string;
      id: string;
      avatar: string | null;
    }[];
  };
  employer: {
    fullname: string;
    companyLink: string;
    positionAndCompany: string;
    telegram: string;
    linkedIn: string;
    user: {
      email: string;
      id: string;
      avatar: string | null;
    }[];
  };
  refusal: {
    createdAt: Date;
    reason: RefusalReason;
    message: string;
  }[];
}

export interface Offer {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  coverLetter: string;
  employerId: string;
  candidateId: string;
  active: boolean;
  isArchive: boolean;

  vacancyId: {
    active: boolean;
    category: string;
    id: string;
  } | null;
  // replies: ReplyOnOfferForm[]
}

export interface ClarifiedData {
  id: string;
  name: ClarifiedDataEnum;
  vacancyId: string;
}

export interface VacancyKeyword {
  id: string;
  name: string;
  vacancyId: string;
}
