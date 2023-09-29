'use client';

import React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/Form';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

import { type SalaryRangeRequest, SalaryRangeValidator } from '@/lib/validators/salary-range';

const SalaryRange: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentParams = qs.parse(searchParams.toString());
  const { salary_min, salary_max } = currentParams;

  const form = useForm<SalaryRangeRequest>({
    resolver: zodResolver(SalaryRangeValidator),
    defaultValues: {
      salary_min: salary_min ? Number(salary_min) : undefined,
      salary_max: salary_max ? Number(salary_max) : undefined,
    },
  });

  function onSubmit({ salary_min, salary_max }: SalaryRangeRequest) {
    const query = {
      ...currentParams,
      salary_min,
      salary_max,
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
      <h4 className="mb-2 flex items-center justify-between font-semibold leading-tight">
        Зарплатні очікування
        {(salary_min ?? salary_max) && (
          <button
            onClick={() => {
              const url = qs.stringifyUrl(
                {
                  url: window.location.href,
                  query: {
                    ...currentParams,
                    salary_min: undefined,
                    salary_max: undefined,
                  },
                },
                { skipNull: true },
              );

              router.push(url);
              router.refresh();
              form.reset();
            }}
            className="text-gray inline p-0 text-2xl font-bold hover:bg-transparent"
          >
            ×
          </button>
        )}
      </h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative inline-flex items-center gap-1"
        >
          <span className="absolute -left-4 top-0.5">$</span>
          <FormField
            control={form.control}
            name="salary_min"
            render={({ field }) => (
              <FormItem className="block w-full">
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    className="h-7 w-12 pl-1 pr-0.5 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
            name="salary_max"
            render={({ field }) => (
              <FormItem className="block w-full">
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(+e.target.value)}
                    className="h-7 w-12 pl-1 pr-0.5 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="До"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" variant="outline" className="h-7 w-12">
            →
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SalaryRange;
