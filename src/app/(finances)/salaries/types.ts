import { EnglishLevel } from '@/lib/enums';

export interface SalariesFilters {
  title: string;
  english_level: EnglishLevel;
  location: string;
  exp: number;
  remote: boolean;
  period: 'last30';
}

export enum SalariesFiltersEnum {
  Title = 'title',
  English = 'english_level',
  Location = 'location',
  Exp = 'exp',
  Remote = 'remote',
  Period = 'period',
}
