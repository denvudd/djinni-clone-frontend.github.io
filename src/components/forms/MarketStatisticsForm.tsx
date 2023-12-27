'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import qs from 'query-string';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MarketPageProps } from '@/app/(finances)/market/page';
import {
  MarketStatisticsRequest,
  MarketStatisticsValidator,
} from '@/lib/validators/market-statistics';
import { Category, City } from '@/types';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/Form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { expLevels } from '../salaries-filters/data-filters';
import { Button } from '../ui/Button';

interface MarketStatisticsFormProps extends MarketPageProps {
  categories: Category[] | undefined;
}

const MarketStatisticsForm: React.FC<MarketStatisticsFormProps> = ({
  searchParams,
  categories,
}) => {
  const router = useRouter();
  const currentParams = qs.parse(qs.stringify(searchParams), {
    parseNumbers: true,
  }) as unknown as MarketPageProps['searchParams'];

  const form = useForm<MarketStatisticsRequest>({
    resolver: zodResolver(MarketStatisticsValidator),
    defaultValues: {
      exp: -1,
      title: '',
    },
  });

  function onSubmit({ exp, title }: MarketStatisticsRequest) {
    const url = qs.stringifyUrl(
      {
        url: '/market',
        ...currentParams,
        query: {
          title,
          exp: exp === -1 ? undefined : exp,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );

    router.push(url);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex items-end gap-4">
        {/* {isCandidateError && <ErrorAlert />} */}
        <FormField
          control={form.control}
          name="exp"
          render={({ field }) => (
            <FormItem className="flex flex-[1_0_0] flex-col gap-2">
              <FormLabel className="text-base font-medium">Спеціалізація</FormLabel>
              <div>
                <Select
                  onValueChange={(value) => field.onChange(+value)}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {expLevels.map((exp) => (
                      <SelectItem value={String(exp.value)} key={exp.value}>
                        {exp.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-[1_0_0] flex-col gap-2">
              <FormLabel className="text-base font-medium">Спеціалізація</FormLabel>
              <div>
                <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="">(не важливо)</SelectItem>
                    {categories?.map((category) => (
                      <SelectGroup key={category.name}>
                        <SelectLabel>{category.name}</SelectLabel>
                        {category.subcategories.map((subcategory) => (
                          <SelectItem value={subcategory.name} key={subcategory.id}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="flex-[0_0_auto]">
          Застосувати
        </Button>
      </form>
    </Form>
  );
};

export default MarketStatisticsForm;
