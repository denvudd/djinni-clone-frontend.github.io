'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueries } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { TagsInput } from 'react-tag-input-component';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Checkbox } from '@/components/ui/Checkbox';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { Separator } from '@/components/ui/Separator';

import axios from '@/lib/axios';
import { CreateVacancyValidator, type CreateVacancyRequest } from '@/lib/validators/create-vacancy';
import { Vacancy, type Category, type City, type Domain } from '@/types';
import {
  convertEnumObjToArray,
  formatClarifiedData,
  formatEmploymenOptions,
  formatEnglishLevel,
} from '@/lib/utils';
import { ClarifiedDataEnum, CompanyType, EmploymentOption, EnglishLevel } from '@/lib/enums';
import { getCategories } from '@/actions/get-categories';
import { getCities } from '@/actions/get-cities';

interface CreateVacancyFormProps {
  employerId: string;
  existVacancy: Vacancy | undefined;
}

const CreateVacancyForm: React.FC<CreateVacancyFormProps> = ({ employerId, existVacancy }) => {
  const router = useRouter();

  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>(
    existVacancy?.keywords.map((keyword) => keyword.name) ?? [],
  );
  const existClarifiedData = React.useMemo(
    () => existVacancy?.clarifiedData.map((data) => data.name),
    [existVacancy?.clarifiedData],
  );
  const clarifiedDataArr: ClarifiedDataEnum[] = React.useMemo(
    () => convertEnumObjToArray(ClarifiedDataEnum),
    [],
  );

  const form = useForm<CreateVacancyRequest>({
    resolver: zodResolver(CreateVacancyValidator),
    defaultValues: {
      active: existVacancy?.active,
      name: existVacancy?.name,
      domain: existVacancy?.domain,
      category: existVacancy?.category,
      city: existVacancy?.city,
      description: existVacancy?.description,
      companyType: existVacancy?.companyType,
      experience: existVacancy?.experience,
      privateSalaryForkGte: existVacancy?.privateSalaryForkGte,
      privateSalaryForkLte: existVacancy?.privateSalaryForkLte,
      salaryForkGte: existVacancy?.salaryForkGte,
      salaryForkLte: existVacancy?.salaryForkLte,
      youtube: existVacancy?.youtube,
      keywords: selectedKeywords,
      employmentOptions: existVacancy?.employmentOptions ?? EmploymentOption.Office,
      english: existVacancy?.english ?? EnglishLevel.NoEnglish,
      clarifiedData: existClarifiedData ?? [ClarifiedDataEnum.Test_task],
      isRelocate: existVacancy?.isRelocate ?? true,
    },
  });

  const [
    { data: domains, isLoading: isDomainsLoading },
    { data: categories, isLoading: isCategoriesLoading },
    { data: cities, isLoading: isCitiesLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['domains'],
        queryFn: async () => {
          const { data } = await axios.get('/categories/domain-categories');

          if (data instanceof AxiosError) {
            throw new Error();
          }

          return data as Domain[];
        },
      },
      {
        queryKey: ['categories'],
        queryFn: async () => getCategories(),
      },
      {
        queryKey: ['cities'],
        queryFn: async () => getCities(),
      },
    ],
  });

  const {
    mutate: createVacancy,
    isLoading: isVacancyLoading,
    isError: isVacancyError,
  } = useMutation({
    mutationFn: async ({ ...values }: CreateVacancyRequest) => {
      const payload = {
        employerId,
        ...values,
      };
      const { data } = await axios.post('/vacancies', payload);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as Vacancy;
    },
    onSuccess: (data) => {
      router.push(`/jobs/${data.id}`);
      router.refresh();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const {
    mutate: updateVacancy,
    isLoading: isVacancyUpdating,
    isError: isVacancyUpdateError,
  } = useMutation({
    mutationFn: async ({ ...values }: CreateVacancyRequest) => {
      const payload = {
        employerId,
        ...values,
      };
      const { data } = await axios.patch(`/vacancies/${existVacancy?.id}`, payload);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as Vacancy;
    },
    onSuccess: (data) => {
      router.push(`/jobs/${data.id}`);
      router.refresh();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  function onSubmit(values: CreateVacancyRequest) {
    console.log(values);
    createVacancy(values);
  }

  function onSubmitUpdate(values: CreateVacancyRequest) {
    console.log(values);
    updateVacancy(values);
  }

  return (
    <Form {...form}>
      <form className="mt-4 flex flex-col gap-3">
        {(isVacancyError || isVacancyUpdateError) && <ErrorAlert />}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Хто вам потрібен?
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className="mt-3 font-normal leading-tight">
                  Наприклад: Java-лід на банківський проект
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Домен
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  disabled={isDomainsLoading}
                  defaultValue={existVacancy?.domain}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {domains?.map((domain) => (
                      <SelectItem value={domain.name} key={domain.id}>
                        {domain.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="mt-3 font-normal leading-tight">
                  Наприклад: Fintech або Hardware / IoT
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Детальний опис
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <FormControl>
                  <Textarea rows={12} {...field} />
                </FormControl>
                <FormDescription className="mt-3 font-normal leading-tight">
                  Вимоги, обов&apos;язки, проект, команда, умови праці, компенсаційний пакет. Див.
                  також{' '}
                  <a className="text-link inline" href="/help/tips">
                    поради Джина
                  </a>
                  .
                  <br />
                  Використовуйте <strong>**зірочки**</strong> для bold
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="youtube"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                YouTube відео{' '}
                <Tooltip>
                  <TooltipTrigger className="text-link">[?]</TooltipTrigger>
                  <TooltipContent>
                    Ви можете додати відео про вакансію. Це має бути посилання на YouTube відео, а
                    не посилання на канал.
                  </TooltipContent>
                </Tooltip>
                <span className="block font-normal">(не обов&apos;язково)</span>
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <FormControl>
                  <Input {...field} placeholder="https://www.youtube.com/watch?v=6Zbhvaac68Y" />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Separator className="my-3" />

        <div className="">
          <h4 className="font-bold">Параметри пошуку</h4>
          <p className="text-gray text-sm">
            Джин покаже вашу вакансію тільки відповідним кандидатам.
          </p>
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Спеціалізація
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  disabled={isCategoriesLoading}
                  defaultValue={existVacancy?.category}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {categories?.map((category) => (
                      <SelectGroup key={category.name}>
                        <SelectLabel>{category.name}</SelectLabel>
                        {category.subcategories.map((subcategory) => (
                          <SelectItem value={subcategory.name} key={subcategory.id}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Ключові слова{' '}
                <Tooltip>
                  <TooltipTrigger className="text-link">[?]</TooltipTrigger>
                  <TooltipContent>
                    Ключові слова, за якими кандидат може знайти вакансію в пошуку
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <FormControl>
                  <TagsInput
                    value={field.value}
                    onChange={(tags) => {
                      field.onChange(tags);
                    }}
                    name="keywords"
                    onRemoved={(tag) => {
                      if (field.value) {
                        field.onChange(field.value.filter((t) => t !== tag));
                        setSelectedKeywords(field.value.filter((t) => t !== tag));
                      }
                    }}
                    placeHolder="Введіть та натисніть Enter..."
                    classNames={{
                      input: 'placeholder:text-sm text-sm',
                      tag: 'text-sm bg-white text-white',
                    }}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employmentOptions"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Ремоут / Офіс
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={existVacancy?.employmentOptions}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {convertEnumObjToArray(EmploymentOption).map((option) => (
                      <SelectItem value={option} key={option}>
                        {formatEmploymenOptions(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Місто
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <Select
                  disabled={isCitiesLoading}
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={existVacancy?.city}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {cities?.map(({ city }) => (
                      <SelectItem value={city} key={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isRelocate"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Релокейт
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <RadioGroup
                  onValueChange={(value) => field.onChange(value === 'yes')}
                  defaultValue="yes"
                  defaultChecked={existVacancy?.isRelocate}
                  className="flex gap-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="text-base font-normal">Без релокейту</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="text-base font-normal">
                      За рахунок кандидата або компанії
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
                <FormDescription className="mt-3 font-normal leading-tight">
                  Якщо ваша компанія дозволяє чи оплачує витрати на релокейт працівників.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex items-start justify-between gap-3">
          <div className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
            <label>Зарплатна вилка (у місяць), $</label>
          </div>
          <div className="flex max-w-[63.33333%] flex-[0_0_63.33333%] items-center">
            <div className="max-w-[50%] flex-1 p-4 pt-2">
              <label className="mb-1 font-semibold">Приватна</label>
              <p className="text-gray mb-2 h-10 text-sm">Кандидати ці цифри не побачать</p>
              <div className="flex items-center">
                <FormField
                  control={form.control}
                  name="privateSalaryForkGte"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 items-baseline space-x-1">
                      <FormLabel>від</FormLabel>
                      <FormControl>
                        <Input
                          className="h-7 w-16 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          onChange={(e) => field.onChange(+e.target.value)}
                          value={field.value}
                          ref={field.ref}
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="privateSalaryForkLte"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 items-baseline space-x-1">
                      <FormLabel>до</FormLabel>
                      <FormControl>
                        <Input
                          className="h-7 w-16 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          onChange={(e) => field.onChange(+e.target.value)}
                          value={field.value}
                          ref={field.ref}
                          type="number"
                          min={100}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-teal-subtle max-w-[50%] flex-1 rounded-md p-4 pt-2">
              <label className="mb-1 font-semibold">
                Публічна <span className="text-green">(не обов&apos;язково)</span>
              </label>
              <p className="text-gray mb-2 h-10 text-sm">Ми покажемо цю вилку кандидатам</p>
              <div className="flex items-center">
                <FormField
                  control={form.control}
                  name="salaryForkGte"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 items-baseline space-x-1">
                      <FormLabel>від</FormLabel>
                      <FormControl>
                        <Input
                          className="h-7 w-16 border-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          onChange={(e) => field.onChange(+e.target.value)}
                          value={field.value}
                          ref={field.ref}
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryForkLte"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 items-baseline space-x-1">
                      <FormLabel>до</FormLabel>
                      <FormControl>
                        <Input
                          className="h-7 w-16 border-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          onChange={(e) => field.onChange(+e.target.value)}
                          value={field.value}
                          ref={field.ref}
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Досвід роботи, мінімум
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <Select
                  onValueChange={(value) => field.onChange(+value)}
                  defaultValue={existVacancy?.experience.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="0">Без досвіду</SelectItem>
                    <SelectItem value="1">1 рік</SelectItem>
                    <SelectItem value="2">2 роки</SelectItem>
                    <SelectItem value="3">3 роки</SelectItem>
                    <SelectItem value="5">5 років</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="english"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Англійська
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={existVacancy?.english}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {convertEnumObjToArray(EnglishLevel).map((level) => (
                      <SelectItem value={level} key={level}>
                        {formatEnglishLevel(level).label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyType"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between gap-3">
              <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                Тип компанії
              </FormLabel>
              <div className="max-w-[63.33333%] flex-[0_0_63.33333%]">
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={existVacancy?.companyType}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {convertEnumObjToArray(CompanyType).map((type) => (
                      <SelectItem value={type} key={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clarifiedData"
          render={() => (
            <FormItem className="flex items-center justify-between gap-3">
              <div className="mb-4">
                <FormLabel className="h-full max-w-[33.33333%] flex-[0_0_33.33333%] pt-2 text-base font-semibold">
                  Уточнюючі дані
                  <span className="block font-normal">(не обов&apos;язково)</span>
                </FormLabel>
              </div>
              <div className="flex max-w-[63.33333%] flex-[0_0_63.33333%] flex-wrap gap-3">
                {clarifiedDataArr.slice(1, 4).map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="clarifiedData"
                    render={({ field }) => (
                      <FormItem key={item} className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) =>
                              checked
                                ? field.onChange([...field.value!, item])
                                : field.onChange(field.value?.filter((value) => value !== item))
                            }
                          />
                        </FormControl>
                        <FormLabel className="text-base font-normal">
                          {formatClarifiedData(item)}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 flex justify-end gap-2">
          <Button
            type="submit"
            variant="outline"
            size="lg"
            isLoading={isVacancyLoading}
            disabled={isVacancyLoading || isVacancyUpdating}
            onClick={
              existVacancy
                ? form.handleSubmit(({ active, ...values }) =>
                    onSubmitUpdate({ active: false, ...values }),
                  )
                : form.handleSubmit(({ active, ...values }) =>
                    onSubmit({ active: false, ...values }),
                  )
            }
          >
            Зберегти як чорнетку
          </Button>
          <Button
            type="submit"
            variant="outline"
            size="lg"
            isLoading={isVacancyLoading}
            disabled={isVacancyLoading || isVacancyUpdating}
            onClick={
              existVacancy
                ? form.handleSubmit(({ active, ...values }) =>
                    onSubmitUpdate({ active: false, ...values }),
                  )
                : form.handleSubmit(({ active, ...values }) =>
                    onSubmit({ active: false, ...values }),
                  )
            }
          >
            Подивитись прев&apos;ю
          </Button>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isVacancyLoading || isVacancyUpdating}
            disabled={isVacancyLoading || isVacancyUpdating}
            size="lg"
            className="text-lg"
            onClick={
              existVacancy
                ? form.handleSubmit(({ active, ...values }) =>
                    onSubmitUpdate({ active: true, ...values }),
                  )
                : form.handleSubmit(({ active, ...values }) =>
                    onSubmit({ active: true, ...values }),
                  )
            }
          >
            Опубліковати вакансію
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateVacancyForm;
