'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown } from 'lucide-react';
import axios from '@/lib/axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import EditCandidateSkills from '@/components/EditCandidateSkills';

import {
  type CandidateWizardStep2Request,
  CandidateWizardStep2Validator,
} from '@/lib/validators/candidate-wizard-step2';

import { EmploymentOption } from '@/lib/enums';
import { CandidateProfile, City } from '@/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { cn, convertEnumObjToArray, formatEmploymenOptions } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

interface CandidateWizardStep2Props {
  candidateId: string;
}

const CandidateWizardStep2: React.FC<CandidateWizardStep2Props> = ({ candidateId }) => {
  const router = useRouter();

  const form = useForm<CandidateWizardStep2Request>({
    resolver: zodResolver(CandidateWizardStep2Validator),
    defaultValues: {
      city: '',
      employmentOptions: EmploymentOption.Office,
    },
  });

  const {
    mutate: updateCandidate,
    isLoading: isCandidateLoading,
    isError: isCandidateError,
  } = useMutation({
    mutationFn: async ({ city, employmentOptions }: CandidateWizardStep2Request) => {
      const payload: CandidateWizardStep2Request = {
        city,
        employmentOptions,
      };

      const { data } = await axios.patch(`/candidate/${candidateId}`, payload);

      return data as CandidateProfile;
    },
    onSuccess: () => {
      router.push('/my/wizard/step4');
      form.reset();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const { data: cities, isLoading: isCitiesLoading } = useQuery(['cities'], {
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/countries`);

      const data = await response.json();

      return data as City[];
    },
  });

  function onSubmit(values: CandidateWizardStep2Request) {
    updateCandidate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
        {isCandidateError && <ErrorAlert />}
        <FormField
          control={form.control}
          name="employmentOptions"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="mb-2 text-base font-semibold">Варіанти зайнятості</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {convertEnumObjToArray(EmploymentOption).map((option: EmploymentOption) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={option} />
                      </FormControl>
                      <FormLabel className="text-base">{formatEmploymenOptions(option)}</FormLabel>
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
          name="city"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-base font-semibold">Місто</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn('justify-between', !field.value && 'text-muted-foreground')}
                    >
                      {field.value
                        ? cities!.find((city) => city.city === field.value)?.city
                        : 'Почніть вводити текст і виберіть місто...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="sm:w-60% max-h-[300px] w-full p-0">
                  <Command>
                    <CommandInput placeholder="Почніть вводити текст і виберіть місто..." />
                    <CommandEmpty>Не вибрано жодного міста.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {cities &&
                          !!cities.length &&
                          cities.map((city) => (
                            <CommandItem
                              value={city.city}
                              key={city.city}
                              onSelect={() => {
                                form.setValue('city', city.city);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  city.city === field.value ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {city.city}, {city.admin_name}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="text-base font-semibold">Навички</FormLabel>
          <FormControl>
            <EditCandidateSkills candidateId={candidateId} />
          </FormControl>
          <FormMessage />
        </FormItem>
        <div className="inline-block">
          <Button isLoading={isCandidateLoading} type="submit" className="text-lg">
            Продовжити
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CandidateWizardStep2;
