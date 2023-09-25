'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import PhoneInput from '@/components/ui/PhoneInput';

import {
  EmployerProfileValidator,
  type EmployerProfileRequest,
} from '@/lib/validators/employer-profile/employer-profile';
import { Button } from '@/components/ui/Button';

interface EmployerProfileFormProps {
  fullname: string | undefined;
  positionAndCompany: string | undefined;
  telegram: string | undefined;
  phone: string | undefined;
  linkedIn: string | undefined;
}

const EmployerProfileForm: React.FC<EmployerProfileFormProps> = ({
  fullname,
  linkedIn,
  phone,
  positionAndCompany,
  telegram,
}) => {
  const form = useForm<EmployerProfileRequest>({
    resolver: zodResolver(EmployerProfileValidator),
    defaultValues: {
      fullname: fullname,
      linkedIn: linkedIn,
      phone: phone,
      positionAndCompany: positionAndCompany,
      telegram: telegram,
    },
  });

  function onSubmit(values: EmployerProfileRequest) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-base">
                Ім'я та прізвище
              </FormLabel>
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
              <FormLabel className="font-semibold text-base">
                Посада та компанія
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-6">
          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-base">
                  Telegram
                </FormLabel>
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
                <FormLabel className="font-semibold text-base">
                  Телефон
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    value={field.value + ''}
                    onChange={field.onChange}
                  />
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
              <FormLabel className="font-semibold text-base">
                Ваш профіль LinkedIn
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Посилання на ваш{' '}
                <a
                  href="https://www.linkedin.com/in/?_l=en_US"
                  target="_blank"
                  className="text-link"
                >
                  LinkedIn профіль
                </a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="text-lg" size="lg" type="submit">
          Зберегти зміни
        </Button>
      </form>
    </Form>
  );
};

export default EmployerProfileForm;
