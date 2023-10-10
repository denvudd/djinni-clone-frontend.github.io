'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import axios from '@/lib/axios';

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
import PhoneInput from '@/components/ui/PhoneInput';
import ErrorAlert from '@/components/ui/ErrorAlert';

import {
  EmployerProfileValidator,
  type EmployerProfileRequest,
} from '@/lib/validators/employer-profile/employer-profile';
import { type EmployerProfile } from '@/types';

interface EmployerProfileFormProps {
  employerId: string;
  fullname: string;
  positionAndCompany: string;
  telegram: string | undefined;
  phone: string | undefined;
  linkedIn: string;
}

const EmployerProfileForm: React.FC<EmployerProfileFormProps> = ({
  employerId,
  fullname,
  linkedIn,
  phone,
  positionAndCompany,
  telegram,
}) => {
  const router = useRouter();

  const form = useForm<EmployerProfileRequest>({
    resolver: zodResolver(EmployerProfileValidator),
    defaultValues: {
      fullname,
      linkedIn,
      phone,
      positionAndCompany,
      telegram,
    },
  });

  const {
    mutate: updateProfile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useMutation({
    mutationFn: async ({
      fullname,
      positionAndCompany,
      linkedIn,
      phone,
      telegram,
    }: EmployerProfileRequest) => {
      const payload = {
        fullname,
        positionAndCompany,
        linkedIn: linkedIn ?? null,
        phone,
        telegram: telegram ?? null,
      };

      const { data } = await axios.patch(`/employer/${employerId}`, payload);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as EmployerProfile;
    },
    onSuccess: () => {
      router.push('/home/profile?updated=ok');
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  function onSubmit(values: EmployerProfileRequest) {
    updateProfile(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {isProfileError && <ErrorAlert />}
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Ім&apos;я та прізвище</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="positionAndCompany"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Посада та компанія</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start gap-6">
          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base font-semibold">Telegram</FormLabel>
                <FormControl>
                  <Input {...field} />
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
        </div>

        <FormField
          control={form.control}
          name="linkedIn"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-base font-semibold">Ваш профіль LinkedIn</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Посилання на ваш{' '}
                <a
                  href="https://www.linkedin.com/in/?_l=en_US"
                  target="_blank"
                  className="text-link"
                  rel="noreferrer"
                >
                  LinkedIn профіль
                </a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          isLoading={isProfileLoading}
          disabled={isProfileLoading}
          className="text-lg"
          size="lg"
          type="submit"
        >
          Зберегти зміни
        </Button>
      </form>
    </Form>
  );
};

export default EmployerProfileForm;
