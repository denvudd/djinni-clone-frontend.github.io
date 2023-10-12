'use client';

import React from 'react';

import Link from 'next/link';
import qs from 'query-string';
import { nanoid } from 'nanoid';

import { ListFilter, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/Sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/Accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

import {
  cn,
  convertEnumObjToArray,
  formatEmploymenOptions,
  formatEnglishLevel,
  formatExperience,
} from '@/lib/utils';
import { EmploymentOption, EnglishLevel } from '@/lib/enums';
import { EmployerSubscribe, type Category, type City } from '@/types';
import { type DevelopersFilters, DevelopersFiltersEnum } from '@/app/(employer)/developers/types';

interface SheetDevelopersProps {
  location: string;
  title: string;
  exp_from: string;
  exp_to: string;
  salary_min: string;
  salary_max: string;
  english_level: EnglishLevel;
  employment_options: EmploymentOption;
  ready_to_relocate: string;
  page: string;
  keywords: string;

  cities: City[] | undefined;
  categories: Category[] | undefined;
  subscriptions: EmployerSubscribe[] | undefined;
}

const SheetDevelopers: React.FC<SheetDevelopersProps> = ({
  employment_options,
  english_level,
  exp_from,
  exp_to,
  keywords,
  location,
  page,
  ready_to_relocate,
  salary_max,
  salary_min,
  title,
  categories,
  cities,
  subscriptions,
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<DevelopersFilters>({
    employment_options,
    english_level,
    exp_from,
    exp_to,
    keywords,
    location,
    page,
    ready_to_relocate,
    salary_max,
    salary_min,
    title,
  });

  const onFilterChange = React.useCallback(
    (filter: DevelopersFiltersEnum) => (event: React.ChangeEvent<HTMLInputElement> | string) => {
      const stringifiedValue = typeof event === 'string' ? event : event.target?.value;

      // console.log(filter, event.target.value);
      setFilters((prev) => ({
        ...prev,
        [filter]: stringifiedValue,
      }));
    },
    [filters],
  );

  const onSubmit = React.useCallback(() => {
    const url = qs.stringifyUrl({
      url: window.location.href,
      query: {
        ...filters,
      },
    });

    setIsOpen(false);
    router.push(url);
    router.refresh();
  }, [filters]);

  const onReset = React.useCallback(() => {
    setIsOpen(false);
    window.location.href = '/developers'; // to reset filters and reload page
  }, []);

  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center bg-white">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <div className="border-borderColor flex w-full items-center border-t p-3">
            <Button variant="outline" className="w-full gap-2 text-lg font-semibold">
              <ListFilter className="h-4 w-4" />
              Фільтри
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-full overflow-y-scroll p-0">
          <SheetHeader className="border-borderColor border-b">
            <SheetTitle className="p-3 text-left">Фільтри</SheetTitle>
          </SheetHeader>

          <div className="p-3 pb-20">
            <Accordion
              type="multiple"
              defaultValue={[
                'location',
                'title',
                'exp',
                'salary',
                'english',
                'employment_options',
                'subscriptions',
              ]}
            >
              <AccordionItem value="location" className="border-0">
                <AccordionTrigger className="flex-row-reverse justify-end gap-2 text-base">
                  Місто
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="columns-2 space-y-2">
                    {!cities?.length && (
                      <li>Не вдалось загрузити список міст. Повторіть спробу через якийсь час.</li>
                    )}
                    {cities &&
                      !!cities.length &&
                      cities.map(({ city }) => (
                        <li>
                          <input
                            value={city}
                            type="radio"
                            name="city"
                            id={city}
                            className="hidden"
                            onChange={onFilterChange(DevelopersFiltersEnum.Location)}
                          />
                          <label
                            htmlFor={city}
                            className={cn(
                              'text-primary inline-flex border border-transparent p-1 text-start text-base font-normal',
                              {
                                'border border-gray bg-light rounded-sm': city === filters.location,
                              },
                            )}
                          >
                            {city}
                          </label>
                        </li>
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="title" className="border-0">
                <AccordionTrigger className="flex-row-reverse justify-end gap-2 text-base">
                  Спеціалізація
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-1">
                    {!categories?.length && (
                      <li>
                        Не вдалось загрузити список категорій. Повторіть спробу через якийсь час.
                      </li>
                    )}
                    {categories &&
                      !!categories.length &&
                      categories.map((category) => (
                        <ul className="flex flex-col gap-1 text-base">
                          <span className="text-gray mb-1 block font-semibold">
                            {category.name}
                          </span>
                          <div className="columns-2 space-y-2">
                            {category.subcategories.map(({ name }) => (
                              <li>
                                <input
                                  value={name}
                                  type="radio"
                                  name="subcategory"
                                  id={name}
                                  className="hidden"
                                  onChange={onFilterChange(DevelopersFiltersEnum.Title)}
                                />
                                <label
                                  htmlFor={name}
                                  className={cn(
                                    'text-primary inline-flex border border-transparent p-1 text-start text-base font-normal',
                                    {
                                      'border border-gray bg-light rounded-sm':
                                        name === filters.title,
                                    },
                                  )}
                                >
                                  {name}
                                </label>
                              </li>
                            ))}
                          </div>
                        </ul>
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="exp" className="border-0">
                <AccordionTrigger className="flex-row-reverse justify-end gap-2 text-base">
                  Досвід роботи
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={onFilterChange(DevelopersFiltersEnum.ExpFrom)}
                      defaultValue={exp_from}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="(не важливо)" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array(11)
                          .fill(null)
                          .map((_, i) => (
                            <SelectItem key={nanoid(2)} value={String(i)}>
                              {formatExperience(i)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={onFilterChange(DevelopersFiltersEnum.ExpTo)}
                      defaultValue={exp_to}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="(не важливо)" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array(11)
                          .fill(null)
                          .map((_, i) => (
                            <SelectItem key={nanoid(2)} value={String(i)}>
                              {formatExperience(i)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="salary" className="border-0">
                <AccordionTrigger className="flex-row-reverse justify-end gap-2 text-base">
                  Зарплата
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-2">
                    <Input
                      onChange={onFilterChange(DevelopersFiltersEnum.SalaryMin)}
                      placeholder="$ від"
                      className="text-base"
                      defaultValue={salary_min}
                    />
                    <Input
                      onChange={onFilterChange(DevelopersFiltersEnum.SalaryMax)}
                      placeholder="$ до"
                      className="text-base"
                      defaultValue={salary_max}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="english" className="border-0">
                <AccordionTrigger className="flex-row-reverse justify-end gap-2 text-base">
                  Англійська
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="columns-2 space-y-2">
                    {convertEnumObjToArray(EnglishLevel).map((level: EnglishLevel) => (
                      <li>
                        <input
                          value={level}
                          type="radio"
                          name="english"
                          id={level}
                          className="hidden"
                          onChange={onFilterChange(DevelopersFiltersEnum.EnglishLevel)}
                        />
                        <label
                          htmlFor={level}
                          className={cn(
                            'text-primary inline-flex border border-transparent p-1 text-start text-base font-normal',
                            {
                              'border border-gray bg-light rounded-sm':
                                level === filters.english_level,
                            },
                          )}
                        >
                          {formatEnglishLevel(level).label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="employment_options" className="border-0">
                <AccordionTrigger className="flex-row-reverse justify-end gap-2 text-base">
                  Зайнятість
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="columns-2 space-y-2">
                    {convertEnumObjToArray(EmploymentOption).map((option: EmploymentOption) => (
                      <li>
                        <input
                          value={option}
                          type="radio"
                          name="employment"
                          id={option}
                          className="hidden"
                          onChange={onFilterChange(DevelopersFiltersEnum.EmploymentOptions)}
                        />
                        <label
                          htmlFor={option}
                          className={cn(
                            'text-primary inline-flex border border-transparent p-1 text-start text-base font-normal',
                            {
                              'border border-gray bg-light rounded-sm':
                                option === filters.employment_options,
                            },
                          )}
                        >
                          {formatEmploymenOptions(option)}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {!!subscriptions?.length && (
                <AccordionItem value="subscriptions" className="border-0">
                  <AccordionTrigger className="flex-row-reverse justify-end gap-2 text-base">
                    Підписки
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="mb-4 flex flex-col gap-4">
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
                            <li key={id} className="text-primary text-base">
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
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>

          <div className="border-borderColor fixed bottom-0 left-0 flex w-full items-center justify-center gap-4 border-t bg-white p-3">
            <Button variant="outline" className="text-lg" onClick={onReset}>
              Скинути
            </Button>
            <Button className="text-lg" onClick={onSubmit}>
              Застосувати
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetDevelopers;
