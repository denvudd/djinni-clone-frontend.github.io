'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import axios from '@/lib/axios';
import { getCategories } from '@/actions/get-categories';
import { getCities } from '@/actions/get-cities';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';

import {
  EmployerSubscribeRequest,
  EmployerSubscribeValidator,
} from '@/lib/validators/employer-profile/employer-subscribe';
import { EmploymentOption, EnglishLevel } from '@/lib/enums';
import { convertEnumObjToArray, formatEmploymenOptions, formatEnglishLevel } from '@/lib/utils';
import { type EmployerProfile } from '@/types';

interface EmployerSubscribeFormProps {
  employerId: string;
}

const EmployerSubscribeForm: React.FC<EmployerSubscribeFormProps> = ({ employerId }) => {
  const router = useRouter();

  const form = useForm<EmployerSubscribeRequest>({
    resolver: zodResolver(EmployerSubscribeValidator),
    defaultValues: {
      experience: 0,
    },
  });

  const {
    mutate: createSubscribe,
    isLoading: isSubscribeLoading,
    isError: isSubscribeError,
  } = useMutation({
    mutationFn: async (values: EmployerSubscribeRequest) => {
      const payload: EmployerSubscribeRequest = values;

      const { data } = await axios.post(`/employer/${employerId}/subscribe`, payload);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as EmployerProfile;
    },
    onSuccess: () => {
      router.push('/home/searches?subscription_saved=ok');
      router.refresh();
      form.reset();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => getCategories(),
  });

  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => getCities(),
  });

  function onSubmit(values: EmployerSubscribeRequest) {
    createSubscribe(values);
  }

  return (
    <Form {...form}>
      <h4 className="mt-4 font-semibold">Додати нову підписку</h4>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-6">
        {isSubscribeError && <ErrorAlert />}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-y-0">
              <FormLabel className="h-full flex-1 text-base font-semibold">Спеціалізація</FormLabel>
              <div className="flex-1">
                <Select onValueChange={(value) => field.onChange(value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(обрати)" />
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
          name="experience"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-y-0">
              <FormLabel className="h-full flex-1 text-base font-semibold">Досвід роботи</FormLabel>
              <div className="flex-1">
                <Select onValueChange={(value) => field.onChange(+value)} defaultValue="0">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="0">Менше року досвіду</SelectItem>
                    <SelectItem value="1">Мінімум 1 рік досвіду</SelectItem>
                    <SelectItem value="2">2 роки досвіду та більше</SelectItem>
                    <SelectItem value="3">3 роки досвіду та більше</SelectItem>
                    <SelectItem value="5">5 років досвіду та більше</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between space-y-0">
          <FormLabel className="h-full flex-1 text-base font-semibold">Зарплата</FormLabel>
          <div className="flex-1">
            <div className="flex items-center">
              <FormField
                control={form.control}
                name="salaryForkGte"
                render={({ field }) => (
                  <FormItem className="flex flex-1 items-baseline space-x-1">
                    <FormControl>
                      <div className="relative grid gap-1">
                        <div className="absolute left-0 top-0 grid h-10 w-8 place-items-center">
                          <span className="text-sm text-zinc-400">$</span>
                        </div>
                        <Input
                          {...field}
                          placeholder="від"
                          className="rounded-ee-none rounded-se-none border-r-0 pl-6 text-base"
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryForkLte"
                render={({ field }) => (
                  <FormItem className="flex flex-1 items-baseline space-x-1">
                    <FormControl>
                      <div className="relative grid gap-1">
                        <div className="absolute left-0 top-0 grid h-10 w-8 place-items-center">
                          <span className="text-sm text-zinc-400">...</span>
                        </div>
                        <Input
                          {...field}
                          placeholder="до"
                          className="rounded-es-none rounded-ss-none border-l-0 pl-6 text-base"
                          onChange={(e) => field.onChange(+e.target.value)}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormMessage />
          </div>
        </div>

        <FormField
          control={form.control}
          name="english"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-y-0">
              <FormLabel className="h-full flex-1 text-base font-semibold">Англійська</FormLabel>
              <div className="flex-1">
                <Select onValueChange={(value) => field.onChange(value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не важливо)" />
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
          name="employmentOptions"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-y-0">
              <FormLabel className="h-full flex-1 text-base font-semibold">Зайнятість</FormLabel>
              <div className="flex-1">
                <Select onValueChange={(value) => field.onChange(value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не важливо)" />
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
          name="locate"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-y-0">
              <FormLabel className="h-full flex-1 text-base font-semibold">Місто</FormLabel>
              <div className="flex-1">
                <Select onValueChange={(value) => field.onChange(value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="(не важливо)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {cities?.length &&
                      cities.map((city) => (
                        <SelectItem value={city.city} key={city.city}>
                          {city.city}
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
          name="keywords"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between space-y-0">
              <FormLabel className="h-full flex-1 text-base font-semibold">Ключові слова</FormLabel>
              <div className="flex-1">
                <Input
                  {...field}
                  className="text-base"
                  placeholder="Наприклад: PostgreSQL, React"
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          isLoading={isSubscribeLoading}
          disabled={isSubscribeLoading}
          className="text-lg"
          size="lg"
          type="submit"
        >
          Додати підписку
        </Button>
      </form>
    </Form>
  );
};

export default EmployerSubscribeForm;
