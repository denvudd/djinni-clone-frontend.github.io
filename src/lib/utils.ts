import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EmploymentOption, EnglishLevel } from './enums';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function mapenumObj(enumObj) {
//   return null;
// }

export function convertEnumObjToArray(enumObj: any) {
  return (Object.keys(enumObj) as Array<keyof typeof enumObj>).map(
    (key) => enumObj[key],
  );
}

export function formatEnglishLevel(englishLevel: EnglishLevel) {
  switch (englishLevel) {
    case 'NoEnglish':
      return 'No English';
    case 'BeginnerElementary':
      return 'Beginner/Elementary';
    case 'PreIntermediate':
      return 'Pre-Intermediate';
    case 'Intermediate':
      return 'Intermediate';
    case 'UpperIntermediate':
      return 'Upper-Intermediate';
    case 'AdvancedFluent':
      return 'Advanced/Fluent';
    default:
      return '';
  }
}

export function formatEmploymenOptions(option: EmploymentOption) {
  switch (option) {
    case 'Remote':
      return 'Віддалена робота';
    case 'Office':
      return 'Офіс';
    case 'PartTime':
      return 'Part-time';
    case 'Freelance':
      return 'Фріланс (разові проекти)';
    case 'RelocateCity':
      return 'Переїзд в інше місто';
    case 'RelocateCountry':
      return 'Переїзд в іншу країну';
    default:
      return '';
  }
}
