import React from 'react';
import Link from 'next/link';
import qs from 'query-string';
import clsx from 'clsx';
import { SalariesPageProps } from '@/app/(finances)/salaries/page';
import { Category, City } from '@/types';
import { Badge } from '../ui/Badge';
import { expLevels } from './data-filters';
import { convertEnumObjToArray, formatEnglishLevel } from '@/lib/utils';
import { EnglishLevel } from '@/lib/enums';
import { SalariesFiltersEnum } from '@/app/(finances)/salaries/types';

interface SidebarSalariesProps extends SalariesPageProps {
  categories: Category[] | undefined;
  cities: City[] | undefined;
}

const SidebarSalaries: React.FC<SidebarSalariesProps> = ({ searchParams, categories, cities }) => {
  const { english_level, exp, title, location, remote } = qs.parse(qs.stringify(searchParams), {
    parseNumbers: true,
    parseBooleans: true,
  }) as unknown as SalariesPageProps['searchParams'];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-gray">Категорія</h3>
        <ul className="flex flex-wrap gap-2">
          <li>
            <Badge
              className={clsx(
                'bg-blue-subtle text-sm font-normal text-primary hover:opacity-70 hover:bg-blue-subtle',
              )}
            >
              <Link
                href={{
                  pathname: '/salaries',
                  query: {
                    ...searchParams,
                    [SalariesFiltersEnum.Title]: undefined,
                  },
                }}
              >
                Усі
              </Link>
            </Badge>
          </li>
          {categories &&
            !!categories.length &&
            categories.map((category) =>
              category.subcategories.map((subcategory) => (
                <li>
                  <Badge
                    className={clsx(
                      'bg-blue-subtle text-sm font-normal text-primary hover:opacity-70 hover:bg-blue-subtle',
                      {
                        'bg-primary text-white hover:text-white hover:bg-primary':
                          subcategory.name === title,
                      },
                    )}
                  >
                    <Link
                      href={{
                        pathname: '/salaries',
                        query: {
                          ...searchParams,
                          [SalariesFiltersEnum.Title]: subcategory.name,
                        },
                      }}
                    >
                      {subcategory.name}
                    </Link>
                  </Badge>
                </li>
              )),
            )}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-gray">Досвід роботи</h3>
        <ul className="flex flex-wrap gap-2">
          {expLevels.map((expLevel) => (
            <li>
              <Badge
                className={clsx(
                  'bg-blue-subtle text-sm font-normal text-primary hover:opacity-70 hover:bg-blue-subtle',
                  {
                    'bg-primary text-white hover:text-white hover:bg-primary':
                      expLevel.value === exp,
                  },
                )}
              >
                <Link
                  href={{
                    pathname: '/salaries',
                    query: {
                      ...searchParams,
                      [SalariesFiltersEnum.Exp]: expLevel.value !== -1 ? expLevel.value : undefined,
                    },
                  }}
                >
                  {expLevel.label}
                </Link>
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-gray">Рівень англійської</h3>
        <ul className="flex flex-wrap gap-2">
          <li>
            <Badge
              className={clsx(
                'bg-blue-subtle text-sm font-normal text-primary hover:opacity-70 hover:bg-blue-subtle',
              )}
            >
              <Link
                href={{
                  pathname: '/salaries',
                  query: {
                    ...searchParams,
                    [SalariesFiltersEnum.English]: undefined,
                  },
                }}
              >
                Будь-який
              </Link>
            </Badge>
          </li>
          {convertEnumObjToArray(EnglishLevel).map((level: EnglishLevel) => (
            <li>
              <Badge
                className={clsx(
                  'bg-blue-subtle text-sm font-normal text-primary hover:opacity-70 hover:bg-blue-subtle',
                  {
                    'bg-primary text-white hover:text-white hover:bg-primary':
                      level === english_level,
                  },
                )}
              >
                <Link
                  href={{
                    pathname: '/salaries',
                    query: {
                      ...searchParams,
                      [SalariesFiltersEnum.English]: level,
                    },
                  }}
                >
                  {formatEnglishLevel(level).label}
                </Link>
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-gray">Місто</h3>
        <ul className="flex flex-wrap gap-2">
          <li>
            <Badge
              className={clsx(
                'bg-blue-subtle text-sm font-normal text-primary hover:opacity-70 hover:bg-blue-subtle',
              )}
            >
              <Link
                href={{
                  pathname: '/salaries',
                  query: {
                    ...searchParams,
                    location: undefined,
                  },
                }}
              >
                Усі
              </Link>
            </Badge>
          </li>
          <li>
            <Badge
              className={clsx(
                'bg-blue-subtle text-sm font-normal text-primary hover:opacity-70 hover:bg-blue-subtle',
                {
                  'bg-primary text-white hover:text-white hover:bg-primary': remote,
                },
              )}
            >
              <Link
                href={{
                  pathname: '/salaries',
                  query: {
                    ...searchParams,
                    [SalariesFiltersEnum.Remote]: true,
                    [SalariesFiltersEnum.Location]: undefined,
                  },
                }}
              >
                Віддалена робота
              </Link>
            </Badge>
          </li>
          {cities &&
            !!cities.length &&
            cities.map(({ city }) => (
              <li>
                <Badge
                  className={clsx(
                    'bg-blue-subtle text-sm font-normal text-primary hover:opacity-70 hover:bg-blue-subtle',
                    {
                      'bg-primary text-white hover:text-white hover:bg-primary': location === city,
                    },
                  )}
                >
                  <Link
                    href={{
                      pathname: '/salaries',
                      query: {
                        ...searchParams,
                        [SalariesFiltersEnum.Remote]: undefined,
                        [SalariesFiltersEnum.Location]: city,
                      },
                    }}
                  >
                    {city}
                  </Link>
                </Badge>{' '}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarSalaries;
