import React from 'react';
import Link from 'next/link';
import axios from 'axios';

import {
  convertEnumObjToArray,
  formatEmploymenOptions,
  formatEnglishLevel,
} from '@/lib/utils';
import { EmploymentOption, EnglishLevel } from '@/lib/enums';
import { X } from 'lucide-react';

import { type DevelopersPageProps } from '@/app/(employer)/developers/page';
import { type Category, type City } from '@/types';
import ExperienceRange from './ExperienceRange';
import SalaryRange from './SalaryRange';
import clsx from 'clsx';

interface SidebarDevelopersProps extends DevelopersPageProps {}

const SidebarDevelopers = async ({ searchParams }: SidebarDevelopersProps) => {
  const {
    employment_options,
    english_level,
    exp_from,
    exp_to,
    location,
    ready_to_relocate,
    salary_max,
    salary_min,
    title,
  } = searchParams;

  const fetchCities = async () => {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL + '/countries/popular',
      );

      return data as City[];
    } catch (error) {
      console.log('[DEV]: ', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        process.env.BACKEND_API_URL + '/categories',
      );

      return data as Category[];
    } catch (error) {
      console.log('[DEV]: ', error);
    }
  };

  const cities = await fetchCities();
  const categories = await fetchCategories();

  return (
    <aside className="col-span-1">
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="leading-tight font-semibold mb-2 flex justify-between items-center">
            Місто
            {location && (
              <Link
                href={{
                  pathname: '/developers',
                  query: { ...searchParams, location: undefined },
                }}
              >
                <span className="w-4 h-4 text-gray font-bold text-2xl">×</span>
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
          <h4 className="leading-tight font-semibold mb-2 flex justify-between items-center">
            Спеціалізація
            {title && (
              <Link
                href={{
                  pathname: '/developers',
                  query: { ...searchParams, title: undefined },
                }}
              >
                <span className="w-4 h-4 text-gray font-bold text-2xl">×</span>
              </Link>
            )}
          </h4>
          <ul className="flex flex-col gap-1">
            {categories &&
              !!categories.length &&
              categories.map((category) => (
                <ul className="flex flex-col gap-1">
                  <span className="block mb-1 font-semibold text-gray">
                    {category.name}
                  </span>
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
          <h4 className="leading-tight font-semibold mb-2 flex justify-between items-center">
            Англійська
            {english_level && (
              <Link
                href={{
                  pathname: '/developers',
                  query: { ...searchParams, english_level: undefined },
                }}
              >
                <span className="w-4 h-4 text-gray font-bold text-2xl">×</span>
              </Link>
            )}
          </h4>
          <ul className="flex flex-col gap-1">
            {convertEnumObjToArray(EnglishLevel).map((level) => (
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
          <h4 className="leading-tight font-semibold mb-2 flex justify-between items-center">
            Зайнятість
            {employment_options && (
              <Link
                href={{
                  pathname: '/developers',
                  query: { ...searchParams, employment_options: undefined },
                }}
              >
                <span className="w-4 h-4 text-gray font-bold text-2xl">×</span>
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
      </div>
    </aside>
  );
};

export default SidebarDevelopers;