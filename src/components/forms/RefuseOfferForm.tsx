'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import axios from '@/lib/axios';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/Form';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import ErrorAlert from '../ui/ErrorAlert';

import { RefuseOfferValidator, type RefuseOfferRequest } from '@/lib/validators/refuse-offer';
import { RefusalReason } from '@/lib/enums';
import { cn, convertEnumObjToArray, formatRefusalReason } from '@/lib/utils';

interface RefuseResponse {
  success: boolean;
  candidateId: string;
  employerId: string;
  offerId: string;
  reason: RefusalReason;
  message: string;
}

interface RefuseOfferFormProps extends React.ComponentPropsWithoutRef<'form'> {
  offerId: string;
  employerId: string;
  candidateId: string;
  fullname: string;
  disabled?: boolean;
}

const RefuseOfferForm: React.FC<RefuseOfferFormProps> = ({
  candidateId,
  employerId,
  offerId,
  className,
  fullname,
  disabled = false,
  ...props
}) => {
  const router = useRouter();

  const form = useForm<RefuseOfferRequest>({
    resolver: zodResolver(RefuseOfferValidator),
    defaultValues: {
      message: `Добрий день,\n\nВибачте, ми не готові продовжити спілкування по цій вакансії.\n\n${fullname}.`,
      reason: RefusalReason.Other,
    },
  });

  const {
    mutate: refuseOffer,
    isLoading: isRefuseLoading,
    isError: isRefuseError,
  } = useMutation({
    mutationFn: async ({ message, reason }: RefuseOfferRequest) => {
      const payload = { message, reason, candidateId };
      const { data } = await axios.patch(
        `/employer/${employerId}/offer/${offerId}/refuse`,
        payload,
      );

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as RefuseResponse;
    },
    onSuccess: () => {
      router.push(`/home/inbox/${offerId}?msgsent=ok`);
      router.refresh();
      form.reset();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  function onSubmit(values: RefuseOfferRequest) {
    refuseOffer(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', className)}
        {...props}
      >
        {isRefuseError && <ErrorAlert />}
        <FormField
          control={form.control}
          name="reason"
          disabled={disabled}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="font-semibold mb-2 text-base">
                Чому кандидат вам не підходить?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {convertEnumObjToArray(RefusalReason).map((reason) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem disabled={disabled} value={reason} />
                      </FormControl>
                      <FormLabel className="font-normal text-base">
                        {formatRefusalReason(reason)}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          disabled={disabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold mb-2 text-base">
                Додати повідомлення{' '}
                <span className="font-normal text-gray">(не обов&apos;язково)</span>
              </FormLabel>
              <FormControl>
                <Textarea lang="uk" className="text-base" rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="approve"
          disabled={disabled}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="block"
                    disabled={disabled}
                  />
                </FormControl>
                <FormLabel className="font-normal text-base leading-none">
                  Я підтверджую, що ми <em>не найняли</em> цього кандидата
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={disabled || !form.formState.isValid || isRefuseLoading}
          isLoading={isRefuseLoading}
          type="submit"
        >
          Перемістити до Архіву
        </Button>
      </form>
    </Form>
  );
};

export default RefuseOfferForm;
