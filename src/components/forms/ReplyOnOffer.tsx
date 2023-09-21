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

interface ReplyOnOfferProps {
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
}) => {
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
      const payload = { text, authorId, offerId, replyToId: authorId };
      const { data } = await axios.post(
        `/${replyAs}/${roleId}/offer/${offerId}/reply`,
        payload,
      );

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data;
    },
    onSuccess(data) {
      console.log(data);
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  function onSubmit(values: ReplyOnOfferRequest) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ReplyOnOffer;
