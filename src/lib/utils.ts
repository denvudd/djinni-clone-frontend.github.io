import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ClarifiedDataEnum, EmploymentOption, EnglishLevel, RefusalReason } from './enums';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function convertEnumObjToArray(enumObj: object) {
  return (Object.keys(enumObj) as (keyof typeof enumObj)[]).map((key) => enumObj[key]);
}

export function extractYoutubeKey(url: string) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
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
        tooltip: 'Можу брати участь у мітингах або проходити співбесіду англійською мовою',
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
  if (years === 0) {
    return 'немає досвіду роботи';
  }
  if (years === 1) {
    return '1 рік досвіду';
  }
  if (years >= 2 && years <= 4) {
    return `${years} роки досвіду`;
  }
  if (years >= 5 && years <= 10) {
    return `${years} років досвіду`;
  }
  return 'Більше 10 років досвіду';
}

export function formatClarifiedData(clarifiedData: ClarifiedDataEnum) {
  switch (clarifiedData) {
    case 'Test_task':
      return 'Є тестове завдання';
    case 'Cover_letter':
      // eslint-disable-next-line quotes
      return "Обов'язковий супровідний лист";
    case 'Part_time':
      return 'Part-time';
    default:
      return '';
  }
}

export function formatRefusalReason(reason: RefusalReason) {
  switch (reason) {
    case 'NoExperience':
      return 'Не вистачає досвіду роботи';
    case 'NoSkills':
      return 'Невідповідність навичок';
    case 'BadEnglish':
      return 'Для цієї вакансії потрібен кращий рівень англійської';
    case 'BadLocation':
      return 'Не розглядаємо кандидатів з цієї країни або міста';
    case 'BadSalaryMatch':
      return 'Немає співпадіння по зарплаті';
    case 'StopedHiring':
      return 'Зупинили пошук за цією вакансією';
    case 'Other':
      return 'Інше';
    default:
      return '';
  }
}
