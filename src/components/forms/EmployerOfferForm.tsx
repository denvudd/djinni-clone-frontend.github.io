'use client';

import React from 'react';
import Link from 'next/link';

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
} from '../ui/Form';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import ErrorAlert from '../ui/ErrorAlert';

import {
  EmployerCreateOfferValidator,
  type EmployerCreateOfferRequest,
} from '@/lib/validators/employer-create-offer';
import { type Offer } from '@/types';

interface EmployerOfferFormProps {
  employerId: string;
  candidateId: string;
}

const EmployerOfferForm: React.FC<EmployerOfferFormProps> = ({ candidateId, employerId }) => {
  const router = useRouter();

  const form = useForm<EmployerCreateOfferRequest>({
    resolver: zodResolver(EmployerCreateOfferValidator),
    defaultValues: {
      coverLetter: '',
    },
  });

  const {
    mutate: createOffer,
    isLoading: isOfferLoading,
    isError: isOfferError,
  } = useMutation({
    mutationFn: async ({ coverLetter }: EmployerCreateOfferRequest) => {
      const payload = {
        employerId,
        candidateId,
        coverLetter,
      };
      const { data } = await axios.post(`/employer/${employerId}/offer`, payload);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as Offer;
    },
    onSuccess: (data) => {
      router.push(`/q/${data.candidateId}?msgsent=ok`);
      router.refresh();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const onSubmit = (values: EmployerCreateOfferRequest) => {
    createOffer(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-[75%] flex-col gap-4 space-y-0"
        id="poke_form"
      >
        {isOfferError && <ErrorAlert />}
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 space-y-0">
              <FormLabel className="text-lg font-semibold">Запропонувати вакансію</FormLabel>
              <FormDescription className="mb-2">
                Опишіть коротко вакансію та набір завдань, які буде вирішувати кандидат. Не пишіть
                все, напишіть головне. Ваша мета - зацікавити вакансією. Більше про проект та
                компанію можна розповісти у вашому{' '}
                <Link href="/home/profile" className="text-link">
                  профілі работодавця.
                </Link>{' '}
                <em>
                  Перегляньте:{' '}
                  <a href="/help/tips" target="_blank" className="text-link">
                    Як пропонувати вакансії кандидатам
                  </a>
                </em>
              </FormDescription>
              <FormControl>
                <Textarea {...field} rows={9} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="inline-block">
          <Button isLoading={isOfferLoading} type="submit" className="text-lg">
            Запропонувати вакансію
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EmployerOfferForm;
