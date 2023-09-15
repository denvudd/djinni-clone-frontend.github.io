'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueries } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';

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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Checkbox } from '@/components/ui/Checkbox';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { Separator } from '@/components/ui/Separator';
import { TagsInput } from 'react-tag-input-component';

import {
  CreateVacancyValidator,
  type CreateVacancyRequest,
} from '@/lib/validators/create-vacancy';
import { type Category, type City, type Domain } from '@/types';
import {
  convertEnumObjToArray,
  formatClarifiedData,
  formatEmploymenOptions,
  formatEnglishLevel,
} from '@/lib/utils';
import {
  ClarifiedData,
  CompanyType,
  EmploymentOption,
  EnglishLevel,
} from '@/lib/enums';

interface CreateVacancyFormProps {
  employerId: string;
}

const CreateVacancyForm: React.FC<CreateVacancyFormProps> = ({
  employerId,
}) => {
  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([]);
  const clarifiedDataArr = convertEnumObjToArray(ClarifiedData);

  const form = useForm<CreateVacancyRequest>({
    resolver: zodResolver(CreateVacancyValidator),
    defaultValues: {
      keywords: selectedKeywords,
      employmentOptions: EmploymentOption.Office,
      english: EnglishLevel.NoEnglish,
      clarifiedData: [ClarifiedData.Test_task],
      isRelocate: true,
    },
  });

  function onSubmit(values: CreateVacancyRequest) {
    console.log(values);
  }

  const [
    { data: domains, isLoading: isDomainsLoading },
    { data: categories, isLoading: isCategoriesLoading },
    { data: cities, isLoading: isCitiesLoading },
  ] = useQueries({
    queries: [
      {
        queryKey: ['domains'],
        queryFn: async () => {
          const { data } = await axios.get(`/categories/domain-categories`);

          if (data instanceof AxiosError) {
            throw new Error();
          }

          return data as Domain[];
        },
      },
      {
        queryKey: ['categories'],
        queryFn: async () => {
          const { data } = await axios.get(`/categories`);

          if (data instanceof AxiosError) {
            throw new Error();
          }

          return data as Category[];
        },
      },
      {
        queryKey: ['cities'],
        queryFn: async () => {
          const { data } = await axios.get(`/countries`);

          if (data instanceof AxiosError) {
            throw new Error();
          }

          return data as City[];
        },
      },
    ],
  });

  console.log(form.getValues());

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-start gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Хто вам потрібен?
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription className="font-normal leading-tight mt-3">
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
            <FormItem className="flex items-start gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Домен
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  disabled={isDomainsLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {domains &&
                      domains.map((domain) => (
                        <SelectItem value={domain.name} key={domain.id}>
                          {domain.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription className="font-normal leading-tight mt-3">
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
            <FormItem className="flex items-start gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Детальний опис
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <FormControl>
                  <Textarea rows={12} {...field} />
                </FormControl>
                <FormDescription className="font-normal leading-tight mt-3">
                  Вимоги, обов'язки, проект, команда, умови праці,
                  компенсаційний пакет. Див. також{' '}
                  <a className="text-link inline" href="/help/tips">
                    поради Джина
                  </a>
                  .
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
            <FormItem className="flex items-center gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                YouTube відео{' '}
                <Tooltip>
                  <TooltipTrigger className="text-link">[?]</TooltipTrigger>
                  <TooltipContent>
                    Ви можете додати відео про вакансію. Це має бути посилання
                    на YouTube відео, а не посилання на канал.
                  </TooltipContent>
                </Tooltip>
                <span className="block font-normal">(не обов'язково)</span>
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://www.youtube.com/watch?v=6Zbhvaac68Y"
                  />
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
            <FormItem className="flex items-start gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Спеціалізація
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  disabled={isCategoriesLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {categories &&
                      categories.map((category) => (
                        <SelectGroup key={category.name}>
                          <SelectLabel>{category.name}</SelectLabel>
                          {category.subcategories.map((subcategory) => (
                            <SelectItem
                              value={subcategory.name}
                              key={subcategory.id}
                            >
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
            <FormItem className="flex items-center gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Ключові слова{' '}
                <Tooltip>
                  <TooltipTrigger className="text-link">[?]</TooltipTrigger>
                  <TooltipContent>
                    Ключові слова, за якими кандидат може знайти вакансію в
                    пошуку
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <FormControl>
                  <TagsInput
                    value={field.value}
                    onChange={(tags) => {
                      field.onChange(tags);
                    }}
                    name="fruits"
                    onRemoved={(tag) => {
                      if (field.value) {
                        field.onChange(field.value.filter((t) => t !== tag));
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
            <FormItem className="flex items-start gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Ремоут / Офіс
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <Select onValueChange={(value) => field.onChange(value)}>
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
            <FormItem className="flex items-start gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Місто
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <Select
                  disabled={isCitiesLoading}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {cities &&
                      cities.map(({ city }) => (
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
            <FormItem className="flex items-start gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Релокейт
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <RadioGroup
                  onValueChange={(value) =>
                    field.onChange(value === 'yes' ? true : false)
                  }
                  defaultValue={'yes'}
                  className="flex gap-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal text-base">
                      Без релокейту
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal text-base">
                      За рахунок кандидата або компанії
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
                <FormDescription className="font-normal leading-tight mt-3">
                  Якщо ваша компанія дозволяє чи оплачує витрати на релокейт
                  працівників.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex items-start gap-3 justify-between">
          <div className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
            <label>Зарплатна вилка (у місяць), $</label>
          </div>
          <div className="flex items-center flex-[0_0_63.33333%] max-w-[63.33333%]">
            <div className="flex-1 max-w-[50%] p-4 pt-2">
              <label className="mb-1 font-semibold">Приватна</label>
              <p className="text-gray text-sm h-10 mb-2">
                Кандидати ці цифри не побачать
              </p>
              <div className="flex items-center">
                <FormField
                  control={form.control}
                  name="privateSalaryForkGte"
                  render={({ field }) => (
                    <FormItem className="flex items-baseline flex-1 space-x-1">
                      <FormLabel>від</FormLabel>
                      <FormControl>
                        <Input
                          className="w-16 h-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                    <FormItem className="flex items-baseline flex-1 space-x-1">
                      <FormLabel>до</FormLabel>
                      <FormControl>
                        <Input
                          className="w-16 h-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

            <div className="flex-1 max-w-[50%] p-4 pt-2 bg-teal-subtle rounded-md">
              <label className="mb-1 font-semibold">
                Публічна <span className="text-green">(не обов'язково)</span>
              </label>
              <p className="text-gray text-sm h-10 mb-2">
                Ми покажемо цю вилку кандидатам
              </p>
              <div className="flex items-center">
                <FormField
                  control={form.control}
                  name="salaryForkGte"
                  render={({ field }) => (
                    <FormItem className="flex items-baseline flex-1 space-x-1">
                      <FormLabel>від</FormLabel>
                      <FormControl>
                        <Input
                          className="w-16 h-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                    <FormItem className="flex items-baseline flex-1 space-x-1">
                      <FormLabel>до</FormLabel>
                      <FormControl>
                        <Input
                          className="w-16 h-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
            <FormItem className="flex items-start gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Досвід роботи, мінімум
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <Select onValueChange={(value) => field.onChange(+value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не обрано)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value={`0`}>Без досвіду</SelectItem>
                    <SelectItem value={`1`}>1 рік</SelectItem>
                    <SelectItem value={`2`}>2 роки</SelectItem>
                    <SelectItem value={`3`}>3 роки</SelectItem>
                    <SelectItem value={`5`}>5 років</SelectItem>
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
            <FormItem className="flex items-start gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Англійська
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <Select onValueChange={(value) => field.onChange(value)}>
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
            <FormItem className="flex items-start gap-3 justify-between">
              <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                Тип компанії
              </FormLabel>
              <div className="flex-[0_0_63.33333%] max-w-[63.33333%]">
                <Select onValueChange={(value) => field.onChange(value)}>
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
            <FormItem className="flex items-center gap-3 justify-between">
              <div className="mb-4">
                <FormLabel className="pt-2 flex-[0_0_33.33333%] max-w-[33.33333%] font-semibold h-full text-base">
                  Уточнюючі дані
                  <span className="block font-normal">(не обов'язково)</span>
                </FormLabel>
              </div>
              <div className="flex flex-wrap gap-3 flex-[0_0_63.33333%] max-w-[63.33333%]">
                {clarifiedDataArr.slice(1, 4).map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="clarifiedData"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex items-center gap-2 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value!, item])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-base font-normal">
                            {formatClarifiedData(item)}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="text-lg">
            Опубліковати вакансію
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateVacancyForm;
