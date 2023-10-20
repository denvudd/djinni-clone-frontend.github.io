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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';

import {
  EmployerAboutRequest,
  EmployerAboutValidator,
} from '@/lib/validators/employer-account/employer-about';
import { type EmployerProfile } from '@/types';

interface EmployerAboutFormProps {
  employerId: string;
  aboutCompany: string | undefined;
  companyLink: string;
  dou: string | undefined;
}

const EmployerAboutForm: React.FC<EmployerAboutFormProps> = ({
  employerId,
  aboutCompany,
  companyLink,
  dou,
}) => {
  const router = useRouter();

  const form = useForm<EmployerAboutRequest>({
    resolver: zodResolver(EmployerAboutValidator),
    defaultValues: {
      aboutCompany,
      companyLink,
      dou,
    },
  });

  const {
    mutate: updateProfile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useMutation({
    mutationFn: async ({ aboutCompany, companyLink, dou }: EmployerAboutRequest) => {
      const payload: EmployerAboutRequest = {
        aboutCompany,
        companyLink,
        dou,
      };

      const { data } = await axios.patch(`/employer/${employerId}`, payload);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as EmployerProfile;
    },
    onSuccess: () => {
      router.push('/home/about?updated=ok');
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  function onSubmit(values: EmployerAboutRequest) {
    updateProfile(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {isProfileError && <ErrorAlert />}
        <FormField
          control={form.control}
          name="aboutCompany"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Про компанію</FormLabel>
              <FormControl>
                <Textarea rows={8} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Веб-сайт</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dou"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Сторінка компанії на DOU</FormLabel>
              <FormControl>
                <Input placeholder="https://jobs.dou.ua/companies/example/" {...field} />
              </FormControl>
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

export default EmployerAboutForm;
