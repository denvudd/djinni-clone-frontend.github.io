'use client';

import {
  ReplyOnOfferValidator,
  type ReplyOnOfferRequest,
} from '@/lib/validators/reply-on-offer';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
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
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ReplyOnOfferProps extends React.ComponentPropsWithoutRef<'form'> {
  offerId: string;
  /** IMPORTANT: This is should be userId and NOT employerId or candidateId. */
  authorId: string;
  employerId?: string;
  candidateId?: string;
}

const ReplyOnOffer: React.FC<ReplyOnOfferProps> = ({
  authorId,
  offerId,
  candidateId,
  employerId,
  className,
  ...props
}) => {
  const router = useRouter();

  const replyAs = employerId ? 'employer' : 'candidate';
  const roleId = employerId ? employerId : candidateId;

  const form = useForm<ReplyOnOfferRequest>({
    resolver: zodResolver(ReplyOnOfferValidator),
    defaultValues: {
      text: '',
    },
  });

  const {
    mutate: replyOnMessage,
    isLoading: isMessageLoading,
    isError: isMessageError,
  } = useMutation({
    mutationFn: async ({ text }: ReplyOnOfferRequest) => {
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

  function onSubmit(values: ReplyOnOfferRequest) {
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold mb-2 text-base">
                Відповісти
              </FormLabel>
              <FormControl>
                <Textarea rows={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isMessageLoading}
          isLoading={isMessageLoading}
          type="submit"
        >
          Надіслати
        </Button>
      </form>
    </Form>
  );
};

export default ReplyOnOffer;
