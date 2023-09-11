'use client';

import React from 'react';
import Link from 'next/link';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type RegisterRequest,
  RegisterValidator,
} from '@/lib/validators/register';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { Icons } from '@/components/ui/Icons';

import { UserRole } from '@/lib/enums';

const Page: React.FC = ({}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterValidator>>({
    resolver: zodResolver(RegisterValidator),
    defaultValues: {
      email: '',
      password: '',
      role: 'Candidate',
    },
  });

  const {
    mutate: register,
    isLoading: isRegisterLoading,
    isError: isRegisterError,
  } = useMutation({
    mutationFn: async ({ email, password, role }: RegisterRequest) => {
      const payload: RegisterRequest = {
        email,
        password,
        role,
      };

      const data = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + '/auth/register',
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return data;
    },
    onSuccess: () => {
      router.push(`/my/wizard?step=0`);
      router.refresh();
    },
  });

  function onSubmit(values: z.infer<typeof RegisterValidator>) {
    register(values);
  }

  return (
    <div className="flex flex-col mx-auto max-w-2xl">
      {isRegisterError && <ErrorAlert />}
      <h1 className="text-4xl font-semibold mb-5">Зареєструватись на Джині</h1>
      <div className="flex">
        <div className="flex-1 pr-9 border-r border-borderColor">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input placeholder="Пароль" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="my-6">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={UserRole.Employer} />
                            </FormControl>
                            <FormLabel>
                              Я роботодавець - шукаю розробників
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={UserRole.Candidate} />
                            </FormControl>
                            <FormLabel>Я кандидат - шукаю пропозиції</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="inline-block">
                <Button
                  isLoading={isRegisterLoading}
                  type="submit"
                  className="text-lg"
                >
                  Продовжити
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="flex-1">
          <div className="pl-9 pb-5 flex flex-col gap-4">
            <Button variant="outline">
              <Icons.linkedin className="w-6 h-6 mr-3" />
              Продовжити з LinkedIn
            </Button>
            <Button variant="outline">
              <Icons.google className="w-5 h-5 mr-3" />
              Продовжити з Google
            </Button>
          </div>
        </div>
      </div>
      <p className="text-sm mt-5 mb-4">
        Реєструючись, ви погоджуєтесь з{' '}
        <a className="underline" href="/terms-of-use">
          умовами використання
        </a>{' '}
        та{' '}
        <a className="underline" href="/pricing">
          тарифами
        </a>
        .
      </p>
      <Link href="/login" className="text-link">
        Я вже маю акаунт
      </Link>
    </div>
  );
};

export default Page;
