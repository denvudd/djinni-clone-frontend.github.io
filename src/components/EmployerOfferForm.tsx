'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/Form';
import { useForm } from 'react-hook-form';
import {
  EmployerCreateOfferValidator,
  type EmployerCreateOfferRequest,
} from '@/lib/validators/employer-create-offer';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';

interface EmployerOfferFormProps {}

const EmployerOfferForm: React.FC<EmployerOfferFormProps> = ({}) => {
  const form = useForm<EmployerCreateOfferRequest>({
    resolver: zodResolver(EmployerCreateOfferValidator),
    defaultValues: {
      coverLetter: '',
    },
  });

  const onSubmit = (values: EmployerCreateOfferRequest) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-0 first-line:max-w-[75%]"
      >
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem className="space-y-0 flex flex-col gap-2">
              <FormLabel className="font-semibold text-lg">
                Запропонувати вакансію
              </FormLabel>
              <FormDescription className="mb-2">
                Опишіть коротко вакансію та набір завдань, які буде вирішувати
                кандидат. Не пишіть все, напишіть головне. Ваша мета -
                зацікавити вакансією. Більше про проект та компанію можна
                розповісти у вашому{' '}
                <Link href="/hone/profile" className="text-link">
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
                <Textarea rows={9} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="text-lg">Запропонувати вакансію</Button>
      </form>
    </Form>
  );
};

export default EmployerOfferForm;
