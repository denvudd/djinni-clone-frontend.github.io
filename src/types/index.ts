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

export interface Country {
  name: string;
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

  category: string;
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
  resumeFile?: CandidateResume[] | null;

  skills: Skill[];
  offers?: Offer[];
  blockedDomains?: BlockedDomain[];
  blockedTypes?: BlockedVacancyType[];
}

export interface CandidateResume {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  candidateId: string;

  resumeUrl: string;
  name: string;
  isMain: boolean;
}

export interface EmployerProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;

  fullname: string;
  companyName: string | null;
  positionAndCompany: string;
  telegram?: string;
  linkedIn: string;
  companyLink: string;
  dou?: string;
  phone?: string;
  aboutCompany?: string;
  filled?: string;

  vacancies: Vacancy[];
  subscriptions: EmployerSubscribe[];
  // offers    Offer[]
  billing?: EmployerBilling;
}

export interface FavoriteCandidate {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  userId: string;
  employerId: string;
  candidateId: string;
}

export interface EmployerSubscribe {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  category: string;
  experience: number;
  salaryForkGte?: number;
  salaryForkLte?: number;
  english: EnglishLevel;
  employmentOptions: EmploymentOption;
  locate: string;
  keywords: string;
}

export interface EmployerBilling {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  company: string | null;
  firstStreet: string;
  secondStreet: string | null;
  postalCode: number;
  vatId: string | null;
}

export interface Vacancy {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  employerId: string;

  active: boolean;
  responsesCount: number;
  views: number;
  name: string;
  domain: string;
  description: string;
  category: string;
  employmentOptions: EmploymentOption;
  country: string;
  city: string;
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

  favoriteVacancies: FavoriteVacancy[];
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

export interface ListVacancy {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  responsesCount: number;
  views: number;
  name: string;
  domain: string;
  description: string;
  category: string;
  employmentOptions: EmploymentOption;
  country: string;
  city: string;
  isRelocate: boolean;
  salaryForkGte: number;
  salaryForkLte: number;
  privateSalaryForkGte: number;
  privateSalaryForkLte: number;
  experience: number;
  english: EnglishLevel;
  companyType: CompanyType;
  youtube?: string;
  employerId: string;
  favoriteVacancies: {
    candidateId: string;
    id: string;
    vacancyId: string;
  }[];
  employer: {
    id: string;
    fullname: string;
    positionAndCompany: string;
    user: {
      avatar: string;
    }[];
  };
}

export interface FavoriteVacancy {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  vacancyId: string;
  candidateId: string;
  vacancy: Vacancy;
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
  isFavorite: boolean;

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
}

export interface BlockedDomain {
  id: string;
  name: string;

  candidateId: string;
}

export interface BlockedVacancyType {
  id: string;
  name: string;

  candidateId: string;
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
