import React from 'react';

import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import qs from 'query-string';
import clsx from 'clsx';

import { Mail } from 'lucide-react';
import { getAuthServerSession } from '@/lib/next-auth';
import { getPopularCities } from '@/actions/get-popular-cities';
import { getCategories } from '@/actions/get-categories';
import ExperienceRange from './ExperienceRange';
import SalaryRange from './SalaryRange';

import { convertEnumObjToArray, formatEmploymenOptions, formatEnglishLevel } from '@/lib/utils';
import { EmploymentOption, EnglishLevel } from '@/lib/enums';
import { type DevelopersPageProps } from '@/app/(employer)/developers/page';
import { type EmployerSubscribe } from '@/types';

type SidebarDevelopersProps = DevelopersPageProps;

const SidebarDevelopers = async ({ searchParams }: SidebarDevelopersProps) => {
  const { employment_options, english_level, location, title } = searchParams;

  const cities = await getPopularCities();
  const categories = await getCategories();

  async function getEmployerSubscriptions() {
    const session = await getAuthServerSession();

    if (!session) return null;

    const { data } = await axios.get(
      process.env.BACKEND_API_URL + `/employer/${session?.user?.employer_id}/subscriptions`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      },
    );

    if (data instanceof AxiosError) throw new Error();

    return data as EmployerSubscribe[];
  }

  const subscriptions = await getEmployerSubscriptions();

  return (
    <aside className="col-span-1">
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="mb-2 flex items-center justify-between font-semibold leading-tight">
            Місто
            {location && (
              <Link
                href={{
                  pathname: '/developers',
                  query: { ...searchParams, location: undefined },
                }}
              >
                <span className="text-gray h-4 w-4 text-2xl font-bold">×</span>
              </Link>
            )}
          </h4>
          <ul className="flex flex-col gap-1">
            {cities &&
              !!cities.length &&
              cities.map(({ city }) => (
                <li>
                  <Link
                    className={clsx('text-primary', {
                      'font-bold': city === location,
                    })}
                    href={{
                      pathname: '/developers',
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
          <h4 className="mb-2 flex items-center justify-between font-semibold leading-tight">
            Спеціалізація
            {title && (
              <Link
                href={{
                  pathname: '/developers',
                  query: { ...searchParams, title: undefined },
                }}
              >
                <span className="text-gray h-4 w-4 text-2xl font-bold">×</span>
              </Link>
            )}
          </h4>
          <ul className="flex flex-col gap-1">
            {categories &&
              !!categories.length &&
              categories.map((category) => (
                <ul className="flex flex-col gap-1">
                  <span className="text-gray mb-1 block font-semibold">{category.name}</span>
                  {category.subcategories.map((subcategory) => (
                    <li>
                      <Link
                        href={{
                          pathname: '/developers',
                          query: {
                            ...searchParams,
                            title: subcategory.name,
                          },
                        }}
                        className={clsx('text-primary', {
                          'font-bold': subcategory.name === title,
                        })}
                      >
                        {subcategory.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
          </ul>
        </div>

        <ExperienceRange />

        <SalaryRange />

        <div>
          <h4 className="mb-2 flex items-center justify-between font-semibold leading-tight">
            Англійська
            {english_level && (
              <Link
                href={{
                  pathname: '/developers',
                  query: { ...searchParams, english_level: undefined },
                }}
              >
                <span className="text-gray h-4 w-4 text-2xl font-bold">×</span>
              </Link>
            )}
          </h4>
          <ul className="flex flex-col gap-1">
            {convertEnumObjToArray(EnglishLevel).map((level: EnglishLevel) => (
              <li>
                <Link
                  href={{
                    pathname: '/developers',
                    query: {
                      ...searchParams,
                      english_level: level,
                    },
                  }}
                  className={clsx('text-primary', {
                    'font-bold': english_level === level,
                  })}
                >
                  {formatEnglishLevel(level).label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-2 flex items-center justify-between font-semibold leading-tight">
            Зайнятість
            {employment_options && (
              <Link
                href={{
                  pathname: '/developers',
                  query: { ...searchParams, employment_options: undefined },
                }}
              >
                <span className="text-gray h-4 w-4 text-2xl font-bold">×</span>
              </Link>
            )}
          </h4>
          <ul className="flex flex-col gap-1">
            {convertEnumObjToArray(EmploymentOption).map((employment) => (
              <li>
                <Link
                  href={{
                    pathname: '/developers',
                    query: {
                      ...searchParams,
                      employment_options: employment,
                    },
                  }}
                  className={clsx('text-primary', {
                    'font-bold': employment === employment_options,
                  })}
                >
                  {formatEmploymenOptions(employment)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {!!subscriptions?.length && (
          <div>
            <h4 className="mb-2 flex items-center justify-between font-semibold leading-tight">
              Мої підписки
            </h4>
            <ul className="mb-4 flex flex-col gap-2">
              {subscriptions.map(
                ({
                  category,
                  employmentOptions,
                  english,
                  experience,
                  id,
                  keywords,
                  locate,
                  salaryForkGte,
                  salaryForkLte,
                }) => {
                  const elementsToRender = [
                    category && `${category}`,
                    employmentOptions && formatEmploymenOptions(employmentOptions),
                    locate && `${locate}`,
                    experience && `${experience}y`,
                    english && formatEnglishLevel(english).label,
                    salaryForkGte && `від $${salaryForkGte}`,
                    salaryForkLte && `до $${salaryForkLte}`,
                    keywords && `${keywords}`,
                  ].filter((e) => Boolean(e));

                  return (
                    <li key={id} className="text-primary">
                      <Link
                        href={qs.stringifyUrl({
                          url: '/developers',
                          query: {
                            title: category ?? undefined,
                            exp_from: experience ?? undefined,
                            english_level: english ?? undefined,
                            employment_options: employmentOptions ?? undefined,
                            location: locate ?? undefined,
                            salary_min: salaryForkGte ?? undefined,
                            salary_max: salaryForkLte ?? undefined,
                            keywords: keywords ?? undefined,
                          },
                        })}
                      >
                        {elementsToRender.join(', ')}
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
            <Link href="/home/searches" className="text-primary flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Керування підписками
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarDevelopers;
