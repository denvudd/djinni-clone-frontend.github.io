'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import axios from '@/lib/axios';
import { getCountries } from '@/actions/get-countries';
import { getCities } from '@/actions/get-cities';

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
import PhoneInput from '@/components/ui/PhoneInput';

import {
  type EmployerBillingRequest,
  EmployerBillingValidator,
} from '@/lib/validators/employer-profile/employer-billing';
import { type EmployerBilling } from '@/types';

interface EmployerBillingFormProps {
  employerId: string;
  isBillingExist: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  company: string | null;
  firstStreet: string;
  secondStreet: string | null;
  postalCode: number;
  vatId: string | null;
}

const EmployerBillingForm: React.FC<EmployerBillingFormProps> = ({
  employerId,
  isBillingExist,
  email,
  city,
  country,
  firstName,
  firstStreet,
  lastName,
  phone,
  postalCode,
  company,
  secondStreet,
  vatId,
}) => {
  const router = useRouter();

  const form = useForm<EmployerBillingRequest>({
    resolver: zodResolver(EmployerBillingValidator),
    defaultValues: {
      email,
      country: country ?? 'Ukraine',
      city: city ?? 'Kyiv',
      company: company ?? undefined,
      firstName,
      firstStreet,
      lastName,
      phone,
      postalCode,
      secondStreet: secondStreet ?? undefined,
      vatId: vatId ?? undefined,
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
      window.location.reload();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const {
    mutate: updateBilling,
    isLoading: isUpdateBillingLoading,
    isError: isUpdateBillingError,
  } = useMutation({
    mutationFn: async (payload: EmployerBillingRequest) => {
      const { data } = await axios.patch(`/employer/${employerId}/billing`, payload);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as EmployerBilling;
    },
    onSuccess: () => {
      router.push('/home/billing?updated=ok');
      window.location.reload();
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
  }

  function onSubmitUpdate(values: EmployerBillingRequest) {
    updateBilling(values);
  }

  return (
    <Form {...form}>
      <h4 className="mb-6 font-semibold">Реквізити для оплати картою</h4>
      <form className="mt-2 space-y-6">
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
                  type="number"
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
          isLoading={isCreateBillingLoading || isUpdateBillingLoading}
          disabled={isCreateBillingLoading || isUpdateBillingLoading}
          className="text-lg"
          size="lg"
          type="submit"
          onClick={isBillingExist ? form.handleSubmit(onSubmitUpdate) : form.handleSubmit(onSubmit)}
        >
          {isBillingExist ? 'Оновити мої реквізити' : 'Створити нові реквізити'}
        </Button>
      </form>
    </Form>
  );
};

export default EmployerBillingForm;
