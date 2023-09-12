'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { Progress } from '@/components/ui/Progress';
import { DollarSign } from 'lucide-react';

import { convertEnumObjToArray, formatEnglishLevel } from '@/lib/utils';
import { EnglishLevel } from '@/lib/enums';
import {
  type CandidateWizardStep1Request,
  CandidateWizardStep1Validator,
} from '@/lib/validators/candidate-wizard-step1';
import { type Category } from '@/types';

const CandidateWizardStep1: React.FC = ({}) => {
  const form = useForm<CandidateWizardStep1Request>({
    resolver: zodResolver(CandidateWizardStep1Validator),
    defaultValues: {
      category: '',
      englishLevel: EnglishLevel.NoEnglish,
      expectations: 1500,
      experience: 0,
      position: '',
    },
  });

  function onSubmit(values: CandidateWizardStep1Request) {
    console.log(values);
  }

  const { data: categories } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get('/categories');

      return data as Category[];
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mt-4"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="flex-1 font-semibold h-full">
                Категорія
              </FormLabel>
              <div className="flex-1">
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {categories &&
                      categories.map((category) => (
                        <SelectGroup key={category.name}>
                          <SelectLabel>{category.name}</SelectLabel>
                          {category.subcategories.map((subcategory) => (
                            <SelectItem
                              value={subcategory.name}
                              key={subcategory.id}
                            >
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
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="flex-1 font-semibold h-full">
                Досвід роботи
              </FormLabel>
              <div className="flex-1">
                <FormControl>
                  <Slider
                    defaultValue={[0]}
                    max={11}
                    step={1}
                    onValueChange={(values) => field.onChange(values[0])}
                    className="mb-2"
                  />
                </FormControl>
                <FormMessage />
                <span className="text-sm">
                  {field.value === 0
                    ? 'немає досвіду роботи'
                    : field.value === 11
                    ? 'більше 10 років'
                    : `${field.value} років`}
                </span>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expectations"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="flex-1 font-semibold h-full">
                Зарплатні очікування
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-link ml-1">[?]</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    Сума "на руки", після сплати податків
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <div className="flex-1">
                <FormControl>
                  <div className="flex items-center">
                    <span className="bg-gray-300 h-10 rounded-l-md py-1 px-3">
                      <DollarSign className="text-gray-dark h-full w-4" />
                    </span>
                    <Input
                      className="border-l-0 rounded-ss-none rounded-es-none"
                      onChange={(e) => field.onChange(+e.target.value)}
                      value={field.value}
                      ref={field.ref}
                      type="number"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="flex-1 font-semibold h-full">
                Посада
              </FormLabel>
              <div className="flex-1">
                <FormControl>
                  <Input placeholder="Наприклад, PHP розробник" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="englishLevel"
          render={({ field }) => (
            <FormItem className="flex items-start justify-between">
              <FormLabel className="flex-1 font-semibold h-full">
                Рівень англійської
              </FormLabel>
              <div className="flex-1">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {convertEnumObjToArray(EnglishLevel).map((level) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={level} />
                        </FormControl>
                        <FormLabel>{formatEnglishLevel(level)}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div className="inline-block">
          <Button type="submit" className="text-lg">
            Продовжити
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CandidateWizardStep1;
