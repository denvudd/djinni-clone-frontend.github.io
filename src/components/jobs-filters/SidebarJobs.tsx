import React from 'react';

import Link from 'next/link';
import qs from 'query-string';
import clsx from 'clsx';

import { Mail } from 'lucide-react';

import Image from 'next/image';
import { convertEnumObjToArray, formatEmploymenOptions, formatEnglishLevel } from '@/lib/utils';
import { CompanyType, EmploymentOption, EnglishLevel, ExpRank } from '@/lib/enums';
import { type Category, type City } from '@/types';
import { JobsPageProps } from '@/app/(candidate)/jobs/page';
import { expLevels, salaryFrom } from './data-filters';
import { Icons } from '../ui/Icons';

interface SidebarDevelopersProps extends JobsPageProps {
  cities: City[] | undefined;
  categories: Category[] | undefined;
  //   subscriptions: EmployerSubscribe[] | undefined;
}

const SidebarJobs = ({
  searchParams,
  categories,
  cities, //   subscriptions,
}: SidebarDevelopersProps) => {
  const {
    company_type,
    employment_options,
    english_level,
    exp_level,
    location,
    page,
    primary_keywords,
    salary,
    title,
    exp_rank,
  } = searchParams;

  return (
    <aside className="col-span-1">
      <div className="flex flex-col gap-5">
        <div>
          <h4 className="text-gray mb-2 leading-tight">Спеціалізація</h4>
          <ul className="flex flex-col gap-1">
            {!categories?.length && (
              <li>Не вдалось загрузити список категорій. Повторіть спробу через якийсь час.</li>
            )}
            {categories &&
              !!categories.length &&
              categories.map((category) => (
                <ul className="flex flex-col gap-1">
                  <span className="text-gray mb-1 block text-sm">{category.name}</span>
                  <div className="flex flex-wrap items-center gap-1">
                    {category.subcategories.map((subcategory) => (
                      <li className="bg-blue-subtle rounded-md px-2 py-1">
                        <Link
                          href={{
                            pathname: '/jobs',
                            query: {
                              ...searchParams,
                              title: subcategory.name,
                            },
                          }}
                          className={clsx('text-primary text-sm', {
                            'font-bold': subcategory.name === title,
                          })}
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </ul>
              ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gray mb-2 leading-tight">Місто</h4>
          <ul className="flex flex-wrap items-center gap-1">
            {!cities?.length && (
              <li>Не вдалось загрузити список міст. Повторіть спробу через якийсь час.</li>
            )}
            {cities &&
              !!cities.length &&
              cities.map(({ city }) => (
                <li className="bg-blue-subtle rounded-md px-2 py-1">
                  <Link
                    className={clsx('text-primary text-sm', {
                      'font-bold': city === location,
                    })}
                    href={{
                      pathname: '/jobs',
                      query: {
                        ...searchParams,
                        location: city,
                      },
                    }}
                  >
                    {city}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gray mb-2 leading-tight">Досвід роботи</h4>
          <ul className="flex flex-wrap items-center gap-1">
            {expLevels.map((level) => (
              <li className="bg-blue-subtle rounded-md px-2 py-1">
                <Link
                  className="text-primary text-sm"
                  href={{
                    pathname: '/jobs',
                    query: {
                      ...searchParams,
                      exp_level: level.value,
                    },
                  }}
                >
                  {level.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gray mb-2 leading-tight">Рівень досвіду</h4>
          <ul className="flex flex-wrap items-center gap-1">
            {convertEnumObjToArray(ExpRank).map((level) => (
              <li className="bg-blue-subtle rounded-md px-2 py-1">
                <Link
                  className="text-primary text-sm"
                  href={{
                    pathname: '/jobs',
                    query: {
                      ...searchParams,
                      exp_rank: level,
                    },
                  }}
                >
                  {level}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gray mb-2 leading-tight">Зайнятість</h4>
          <ul className="flex flex-wrap items-center gap-1">
            {convertEnumObjToArray(EmploymentOption).map((option) => (
              <li className="bg-blue-subtle rounded-md px-2 py-1">
                <Link
                  className="text-primary text-sm"
                  href={{
                    pathname: '/jobs',
                    query: {
                      ...searchParams,
                      employment_options: option,
                    },
                  }}
                >
                  {formatEmploymenOptions(option)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gray mb-2 leading-tight">Тип компанії</h4>
          <ul className="flex flex-wrap items-center gap-1">
            {convertEnumObjToArray(CompanyType).map((type) => (
              <li className="bg-blue-subtle rounded-md px-2 py-1">
                <Link
                  className="text-primary text-sm"
                  href={{
                    pathname: '/jobs',
                    query: {
                      ...searchParams,
                      company_type: type,
                    },
                  }}
                >
                  {type}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gray mb-2 leading-tight">Зарплата від</h4>
          <ul className="flex flex-wrap items-center gap-1">
            {salaryFrom.map((from) => (
              <li className="bg-blue-subtle rounded-md px-2 py-1">
                <Link
                  className="text-primary text-sm"
                  href={{
                    pathname: '/jobs',
                    query: {
                      ...searchParams,
                      salary: from,
                    },
                  }}
                >
                  ${from}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gray mb-2 leading-tight">Англійська</h4>
          <ul className="flex flex-wrap items-center gap-1">
            {convertEnumObjToArray(EnglishLevel).map((level) => (
              <li className="bg-blue-subtle rounded-md px-2 py-1">
                <Link
                  className="text-primary text-sm"
                  href={{
                    pathname: '/jobs',
                    query: {
                      ...searchParams,
                      english_level: level,
                    },
                  }}
                >
                  {formatEnglishLevel(level).label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-light flex h-20 flex-col justify-center rounded-md text-center text-sm">
            <p className="w-full">Питання, зауваження, ідеї? 👇</p>
            <a
              href="https://t.me/+anfy80XXKe9kNDli"
              target="_blank"
              className="text-primary flex w-full items-center justify-center gap-1"
              rel="noreferrer"
            >
              <Icons.Telegram className="h-4 w-4" />
              Djinni Dev Chat
            </a>
          </div>
          <div className="bg-light flex items-center gap-3 rounded-md px-3 py-4 text-sm">
            <Image src="/djinn.svg" alt="Telegram Bot Djinn" width={40} height={40} />
            <div className="flex flex-col gap-1">
              <strong>Telegram-bot Джина</strong>
              <p>
                Нові вакансії у вас в Телеграм.
                <br />
                <a
                  href="/tg_redirect?src=jobs_old2"
                  className="text-primary w-full"
                  target="_blank"
                  rel="nofollow"
                >
                  Підписатись →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarJobs;
