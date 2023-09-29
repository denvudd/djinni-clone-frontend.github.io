'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/Form';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

import {
  DevelopersSearchValidator,
  type DevelopersSearchRequest,
} from '@/lib/validators/developers-search';

const DevelopersSearch: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = qs.parse(searchParams.toString());

  const form = useForm<DevelopersSearchRequest>({
    resolver: zodResolver(DevelopersSearchValidator),
    defaultValues: {
      keywords: currentParams.keywords ? (currentParams.keywords as string) : undefined,
    },
  });

  function onSubmit({ keywords }: DevelopersSearchRequest) {
    const query = {
      ...currentParams,
      keywords: keywords || undefined,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-full">
        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem className="block w-full">
              <FormControl>
                <Input
                  placeholder="Запит для пошуку, наприклад: Junior PHP Developer"
                  {...field}
                  className="h-10 rounded-ee-none rounded-se-none border-r-0 text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="block h-10 rounded-es-none rounded-ss-none border-l-0 px-4"
        >
          →
        </Button>
      </form>
    </Form>
  );
};

export default DevelopersSearch;
