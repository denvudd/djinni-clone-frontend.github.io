'use client';

import { RefusalReason } from '@/lib/enums';
import {
  RefuseOfferValidator,
  type RefuseOfferRequest,
} from '@/lib/validators/refuse-offer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import ErrorAlert from '../ui/ErrorAlert';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { cn, convertEnumObjToArray, formatRefusalReason } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { Checkbox } from '../ui/Checkbox';

interface RefuseOfferFormProps extends React.ComponentPropsWithoutRef<'form'> {
  offerId: string;
  employerId: string;
  candidateId: string;
  fullname: string;
}

const RefuseOfferForm: React.FC<RefuseOfferFormProps> = ({
  candidateId,
  employerId,
  offerId,
  className,
  fullname,
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

      return data;
    },
    onSuccess: () => {
      router.push(`/home/inbox/archive`);
      router.refresh();
      form.reset();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  function onSubmit(values: RefuseOfferRequest) {
    refuseOffer(values);
    // console.log(values);
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
                        <RadioGroupItem value={reason} />
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold mb-2 text-base">
                Додати повідомлення{' '}
                <span className="font-normal text-gray">(не обов'язково)</span>
              </FormLabel>
              <FormControl>
                <Textarea className="text-base" rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="approve"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="block"
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
          disabled={!form.formState.isValid || isRefuseLoading}
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
