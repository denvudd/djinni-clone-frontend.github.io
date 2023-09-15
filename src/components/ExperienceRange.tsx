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
  ExperienceRangeValidator,
  type ExperienceRangeRequest,
} from '@/lib/validators/experience-range';
import Link from 'next/link';

const ExperienceRange: React.FC = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = qs.parse(searchParams.toString());
  const { exp_from, exp_to } = currentParams;

  const form = useForm<ExperienceRangeRequest>({
    resolver: zodResolver(ExperienceRangeValidator),
    defaultValues: {
      exp_from: exp_from ? Number(exp_from) : undefined,
      exp_to: exp_to ? Number(exp_to) : undefined,
    },
  });

  function onSubmit({ exp_from, exp_to }: ExperienceRangeRequest) {
    const query = {
      ...currentParams,
      exp_from: exp_from ? Number(exp_from) : undefined,
      exp_to: exp_to ? Number(exp_to) : undefined,
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
    <div>
      <h4 className="leading-tight font-semibold mb-2 flex justify-between items-center">
        Досвід роботи
        {(exp_from || exp_to) && (
          <button
            onClick={() => {
              const url = qs.stringifyUrl(
                {
                  url: window.location.href,
                  query: {
                    ...currentParams,
                    exp_from: undefined,
                    exp_to: undefined,
                  },
                },
                { skipNull: true },
              );

              router.push(url);
              router.refresh();
              form.reset();
            }}
            className="inline text-gray font-bold text-2xl p-0 hover:bg-transparent"
          >
            ×
          </button>
        )}
      </h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="inline-flex items-center gap-1"
        >
          <FormField
            control={form.control}
            name="exp_from"
            render={({ field }) => (
              <FormItem className="block w-full">
                <FormControl>
                  <Input
                    min="0"
                    max="10"
                    step="0.5"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    className="w-12 h-7 pl-1 pr-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Від"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span>...</span>
          <FormField
            control={form.control}
            name="exp_to"
            render={({ field }) => (
              <FormItem className="block w-full">
                <FormControl>
                  <Input
                    min="0"
                    max="11"
                    step="0.5"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    className="w-12 h-7 pl-1 pr-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="До"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="sm"
            variant="outline"
            className="w-12 h-7"
          >
            →
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ExperienceRange;
