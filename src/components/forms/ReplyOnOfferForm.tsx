'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import ErrorAlert from '../ui/ErrorAlert';

import {
  ReplyOnOfferFormValidator,
  type ReplyOnOfferFormRequest,
} from '@/lib/validators/reply-on-offer';
import { cn } from '@/lib/utils';

interface ReplyOnOfferFormProps extends React.ComponentPropsWithoutRef<'form'> {
  offerId: string;
  /** IMPORTANT: This is should be userId and NOT employerId or candidateId. */
  authorId: string;
  employerId?: string;
  candidateId?: string;
  disabled?: boolean;
}

const ReplyOnOfferForm: React.FC<ReplyOnOfferFormProps> = ({
  authorId,
  offerId,
  candidateId,
  employerId,
  className,
  disabled = false,
  ...props
}) => {
  const router = useRouter();

  const replyAs = employerId ? 'employer' : 'candidate';
  const roleId = employerId ? employerId : candidateId;

  const form = useForm<ReplyOnOfferFormRequest>({
    resolver: zodResolver(ReplyOnOfferFormValidator),
    defaultValues: {
      text: '',
    },
  });

  const {
    mutate: replyOnMessage,
    isLoading: isMessageLoading,
    isError: isMessageError,
  } = useMutation({
    mutationFn: async ({ text }: ReplyOnOfferFormRequest) => {
      const payload = { text, authorId, replyToId: authorId };
      const { data } = await axios.post(
        `/${replyAs}/${roleId}/offer/${offerId}/reply`,
        payload,
      );

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data;
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

  function onSubmit(values: ReplyOnOfferFormRequest) {
    replyOnMessage(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-4', className)}
        {...props}
      >
        {isMessageError && <ErrorAlert />}
        <FormField
          control={form.control}
          name="text"
          disabled={disabled}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold mb-2 text-base">
                Відповісти
              </FormLabel>
              <FormControl>
                <Textarea lang="uk" className="text-base" rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={disabled || isMessageLoading}
          isLoading={isMessageLoading}
          type="submit"
        >
          Надіслати
        </Button>
      </form>
    </Form>
  );
};

export default ReplyOnOfferForm;
