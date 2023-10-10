'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import axios from '@/lib/axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';

import {
  type EmployerBillingRequest,
  EmployerBillingValidator,
} from '@/lib/validators/employer-profile/employer-billing';
import { type EmployerBilling } from '@/types';
import { getCountries } from '@/actions/get-countries';
import { getCities } from '@/actions/get-cities';
import PhoneInput from '@/components/ui/PhoneInput';

interface EmployerBillingFormProps {
  employerId: string;
  email: string;
}

const EmployerBillingForm: React.FC<EmployerBillingFormProps> = ({ employerId, email }) => {
  const router = useRouter();

  const form = useForm<EmployerBillingRequest>({
    resolver: zodResolver(EmployerBillingValidator),
    defaultValues: {
      email,
      country: 'Ukraine',
      city: 'Kyiv',
    },
  });

  const {
    mutate: createBilling,
    isLoading: isCreateBillingLoading,
    isError: isCreateBillingError,
  } = useMutation({
    mutationFn: async (payload: EmployerBillingRequest) => {
      const { data } = await axios.post(`/employer/${employerId}/billing`, payload);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as EmployerBilling;
    },
    onSuccess: () => {
      router.push('/home/billing?updated=ok');
      router.refresh();
      form.reset();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const { data: countries, isLoading: isCountriesLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => getCountries(),
  });

  const { data: cities, isLoading: isCitiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => getCities(),
  });

  function onSubmit(values: EmployerBillingRequest) {
    createBilling(values);
    // console.log('SUBMIT', values);
  }

  return (
    <Form {...form}>
      <h4 className="mb-6 font-semibold">Реквізити для оплати картою</h4>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-6">
        {isCreateBillingError && <ErrorAlert />}

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Ім&apos;я</FormLabel>
              <FormControl>
                <Input {...field} className="text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Прізвище</FormLabel>
              <FormControl>
                <Input {...field} className="text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Білінг е-мейл</FormLabel>
              <FormControl>
                <Input {...field} className="text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-base font-semibold">Телефон</FormLabel>
              <FormControl>
                <PhoneInput value={field.value + ''} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Країна</FormLabel>
              <Select onValueChange={(value) => field.onChange(value)} defaultValue="Ukraine">
                <FormControl>
                  <SelectTrigger disabled={isCountriesLoading || isCreateBillingLoading}>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px]">
                  {countries?.length &&
                    countries.map((country) => (
                      <SelectItem value={country.name} key={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Компанія (для корп. карт)</FormLabel>
              <FormControl>
                <Input {...field} className="text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstStreet"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Вулиця (рядок 1)</FormLabel>
              <FormControl>
                <Input {...field} className="text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="secondStreet"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Вулиця (рядок 2)</FormLabel>
              <FormControl>
                <Input {...field} className="text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Місто</FormLabel>
              <Select onValueChange={(value) => field.onChange(value)} defaultValue="Kyiv">
                <FormControl>
                  <SelectTrigger disabled={isCitiesLoading || isCreateBillingLoading}>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px]">
                  {cities?.length &&
                    cities.map(({ city }) => (
                      <SelectItem value={city} key={city}>
                        {city}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Поштовий індекс</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-base"
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vatId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">EU VAT ID (для оплати з ЄС)</FormLabel>
              <FormControl>
                <Input {...field} className="text-base" placeholder="LT12345678" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          isLoading={isCreateBillingLoading}
          disabled={isCreateBillingLoading}
          className="text-lg"
          size="lg"
          type="submit"
        >
          Оновити мої реквізити
        </Button>
      </form>
    </Form>
  );
};

export default EmployerBillingForm;
