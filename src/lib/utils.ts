import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export function formatEnglishLevel(englishLevel: string) {
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
