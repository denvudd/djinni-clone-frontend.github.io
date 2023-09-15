import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EmploymentOption, EnglishLevel } from './enums';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertEnumObjToArray(enumObj: any) {
  return (Object.keys(enumObj) as Array<keyof typeof enumObj>).map(
    (key) => enumObj[key],
  );
}

export function formatEnglishLevel(englishLevel: EnglishLevel): {
  label: string;
  tooltip: string;
} {
  switch (englishLevel) {
    case 'NoEnglish':
      return {
        label: 'No English',
        tooltip: 'Немає знання англійської',
      };
    case 'BeginnerElementary':
      return {
        label: 'Beginner/Elementary',
        tooltip: 'Базова англійська',
      };
    case 'PreIntermediate':
      return {
        label: 'Pre-Intermediate',
        tooltip: 'Можу читати тех. документацію та вести робоче листування',
      };
    case 'Intermediate':
      return {
        label: 'Intermediate',
        tooltip: 'Читаю і розмовляю, але простими фразами та з помилками',
      };
    case 'UpperIntermediate':
      return {
        label: 'Upper-Intermediate',
        tooltip:
          'Можу брати участь у мітингах або проходити співбесіду англійською мовою',
      };
    case 'AdvancedFluent':
      return {
        label: 'Advanced/Fluent',
        tooltip: 'Вільна англійська',
      };
    default:
      return {
        label: '',
        tooltip: '',
      };
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

export function formatExperience(years: number) {
  if (years === 1) {
    return '1 рік досвіду';
  } else if (years >= 2 && years <= 4) {
    return `${years} роки досвіду`;
  } else if (years >= 5 && years <= 10) {
    return `${years} років досвіду`;
  } else {
    return 'Більше 10 років досвіду';
  }
}
