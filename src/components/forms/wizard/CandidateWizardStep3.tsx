'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import ErrorAlert from '@/components/ui/ErrorAlert';

import {
  CandidateWizardStep3Request,
  CandidateWizardStep3Validator,
} from '@/lib/validators/candidate-wizard-step3';
import { type CandidateProfile } from '@/types';

interface CandidateWizardStep3Props {
  candidateId: string;
}

const CandidateWizardStep3: React.FC<CandidateWizardStep3Props> = ({ candidateId }) => {
  const router = useRouter();
  const { update } = useSession();

  const form = useForm<CandidateWizardStep3Request>({
    resolver: zodResolver(CandidateWizardStep3Validator),
    defaultValues: {
      experienceDescr: '',
    },
  });

  const {
    mutate: updateCandidate,
    isLoading: isCandidateLoading,
    isError: isCandidateError,
  } = useMutation({
    mutationFn: async ({ experienceDescr }: CandidateWizardStep3Request) => {
      const payload = { experienceDescr };

      const { data } = await axios.patch(`/candidate/${candidateId}`, {
        ...payload,
        filled: true,
      });

      const updateSession = await update({ filled: true });

      return data as CandidateProfile;
    },
    onSuccess: () => {
      router.push('/my/wizard/finish');
      form.reset();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  function onSubmit(values: CandidateWizardStep3Request) {
    updateCandidate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
        {isCandidateError && <ErrorAlert />}
        <FormField
          control={form.control}
          name="experienceDescr"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-4 space-y-0">
              <div>
                <FormLabel className="mt-0 text-base font-semibold">
                  Розкажіть про ваш досвід роботи
                </FormLabel>
                <FormDescription>
                  Розкажіть, які проекти та задачі виконували, які технології використовували, ваша
                  роль у команді зараз, і куди бажаєте розвиватися
                </FormDescription>
              </div>
              <FormControl>
                <Textarea rows={5} placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="inline-block">
          <Button isLoading={isCandidateLoading} type="submit" className="text-lg">
            Продовжити
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CandidateWizardStep3;
