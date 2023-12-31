'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import ErrorAlert from '@/components/ui/ErrorAlert';

import {
  type EmployerWizardStep1Request,
  EmployerWizardStep1Validator,
} from '@/lib/validators/wizard/employer-wizard-step1';
import { EmployerProfile } from '@/types';

interface EmployerWizardStep1Props {
  employerId: string;
}

const EmployerWizardStep1: React.FC<EmployerWizardStep1Props> = ({ employerId }) => {
  const router = useRouter();
  const { update } = useSession();

  const form = useForm<EmployerWizardStep1Request>({
    resolver: zodResolver(EmployerWizardStep1Validator),
    defaultValues: {
      companyLink: '',
      fullname: '',
      linkedIn: '',
      positionAndCompany: '',
    },
  });

  const {
    mutate: updateEmployer,
    isLoading: isEmployerLoading,
    isError: isEmployerError,
  } = useMutation({
    mutationFn: async ({
      companyLink,
      fullname,
      linkedIn,
      positionAndCompany,
    }: EmployerWizardStep1Request) => {
      const payload: EmployerWizardStep1Request = {
        companyLink,
        fullname,
        linkedIn,
        positionAndCompany,
      };

      const { data } = await axios.patch(`/employer/${employerId}`, {
        ...payload,
        filled: true,
      });

      const updateSession = await update({ filled: true });

      return data as EmployerProfile;
    },
    onSuccess: () => {
      router.push('/developers');
      form.reset();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  function onSubmit(values: EmployerWizardStep1Request) {
    updateEmployer(values);
  }

  const fieldsLeft = React.useMemo(
    () => -Object.keys(form.formState.touchedFields).length + 4,
    [form.formState.touchedFields],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-1 flex flex-col gap-3">
        {isEmployerError && <ErrorAlert />}
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="h-full text-base font-semibold">Ім&aposя та прізвище</FormLabel>
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
              <FormLabel className="h-full text-base font-semibold">Посада та компанія</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="h-full text-base font-semibold">
                    Посилання на ваш{' '}
                    <a
                      href="https://linkedin.com/in/"
                      target="_blank"
                      className="text-link"
                      rel="noreferrer"
                    >
                      LinkedIn профіль
                    </a>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="companyLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="h-full text-base font-semibold">Сайт компанії</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <p>
          {fieldsLeft !== 0 ? (
            <>
              <span className="text-green">Залишилось {fieldsLeft} поля</span>{' '}
              <span>щоб заповнити профіль.</span>
            </>
          ) : (
            <span className="text-green">🎉 Чудово! Ваш профіль виглядає дивовижно.</span>
          )}
        </p>
        <div className="inline-block">
          <Button
            isLoading={isEmployerLoading}
            type="submit"
            className="text-xl"
            disabled={isEmployerLoading}
          >
            Почати наймати на Djinni
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmployerWizardStep1;
