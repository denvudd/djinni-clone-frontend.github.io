'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { DollarSign } from 'lucide-react';
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
import { RadioGroup } from '@/components/ui/RadioGroup';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import ErrorAlert from '@/components/ui/ErrorAlert';
import EnglishLevelGroup from '@/components/EnglishLevelGroup';

import {
  type CandidateWizardStep1Request,
  CandidateWizardStep1Validator,
} from '@/lib/validators/wizard/candidate-wizard-step1';
import { formatExperience } from '@/lib/utils';
import { type CandidateProfile, type Category } from '@/types';
import { EnglishLevel } from '@/lib/enums';

interface CandidateWizardStep1Props {
  candidateId: string;
}

const CandidateWizardStep1: React.FC<CandidateWizardStep1Props> = ({ candidateId }) => {
  const router = useRouter();

  const form = useForm<CandidateWizardStep1Request>({
    resolver: zodResolver(CandidateWizardStep1Validator),
    defaultValues: {
      category: '',
      english: EnglishLevel.NoEnglish,
      expectations: 1500,
      experience: 0,
      position: '',
    },
  });

  const {
    mutate: updateCandidate,
    isLoading: isCandidateLoading,
    isError: isCandidateError,
  } = useMutation({
    mutationFn: async ({
      category,
      english,
      expectations,
      experience,
      position,
    }: CandidateWizardStep1Request) => {
      const payload: CandidateWizardStep1Request = {
        category,
        english,
        expectations,
        experience,
        position,
      };

      const { data } = await axios.patch(`/candidate/${candidateId}`, payload);

      return data as CandidateProfile;
    },
    onSuccess: () => {
      router.push('/my/wizard/step3');
      form.reset();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const { data: categories } = useQuery({
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`);

      const data = await response.json();

      return data as Category[];
    },
  });

  function onSubmit(values: CandidateWizardStep1Request) {
    updateCandidate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">
        {isCandidateError && <ErrorAlert />}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row md:items-center md:justify-between">
              <FormLabel className="h-full text-base font-semibold md:flex-1">Категорія</FormLabel>
              <div className="md:flex-1">
                <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
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

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="md:ustify-between flex flex-col md:flex-row md:items-center">
              <FormLabel className="h-full text-base font-semibold md:flex-1">
                Досвід роботи
              </FormLabel>
              <div className="md:flex-1">
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
                <span className="text-sm">{formatExperience(field.value)}</span>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expectations"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row md:items-center md:justify-between">
              <FormLabel className="h-full text-base font-semibold md:flex-1">
                Зарплатні очікування
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-link ml-1">[?]</span>
                  </TooltipTrigger>
                  <TooltipContent>Сума &quot;на руки&quot;, після сплати податків</TooltipContent>
                </Tooltip>
              </FormLabel>
              <div className="md:flex-1">
                <FormControl>
                  <div className="flex items-center">
                    <span className="h-10 rounded-l-md bg-gray-300 px-3 py-1">
                      <DollarSign className="text-gray-dark h-full w-4" />
                    </span>
                    <Input
                      className="rounded-es-none rounded-ss-none border-l-0"
                      onChange={(event) => field.onChange(+event.target.value)}
                      value={field.value}
                      ref={field.ref}
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
            <FormItem className="flex flex-col md:flex-row md:items-center md:justify-between">
              <FormLabel className="h-full text-base font-semibold md:flex-1">Посада</FormLabel>
              <div className="md:flex-1">
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
          name="english"
          render={({ field }) => (
            <FormItem className="flex flex-col md:flex-row md:items-start md:justify-between">
              <FormLabel className="h-full text-base font-semibold md:flex-1">
                Рівень англійської
              </FormLabel>
              <div className="md:flex-1">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <EnglishLevelGroup />
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="mt-6 inline-block md:mt-0">
          <Button isLoading={isCandidateLoading} type="submit" className="text-lg">
            Продовжити
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CandidateWizardStep1;
