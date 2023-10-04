'use client';

import React from 'react';
import Link from 'next/link';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type RegisterRequest, RegisterValidator } from '@/lib/validators/auth/register';

import PageTitle from '../pagers/PageTitle';
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
import { Icons } from '@/components/ui/Icons';
import ErrorAlert from '@/components/ui/ErrorAlert';

import { UserRole } from '@/lib/enums';

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<RegisterRequest>({
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

      const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return data;
    },
    onSuccess: () => {
      router.push('/login');
      router.refresh();
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
      router.push('/error');
    },
  });

  function onSubmit(values: RegisterRequest) {
    register(values);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      {isRegisterError && <ErrorAlert />}
      <PageTitle className="mb-5 text-4xl">Зареєструватись на Джині</PageTitle>
      <div className="flex">
        <div className="border-borderColor flex-1 border-r pr-9">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
                      <Input placeholder="Пароль" type="password" {...field} />
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
                            <FormLabel>Я роботодавець - шукаю розробників</FormLabel>
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
                <Button isLoading={isRegisterLoading} type="submit" className="text-lg">
                  Продовжити
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-4 pb-5 pl-9">
            <Button variant="outline">
              <Icons.Linkedin className="mr-3 h-6 w-6" />
              Продовжити з LinkedIn
            </Button>
            <Button variant="outline">
              <Icons.Google className="mr-3 h-5 w-5" />
              Продовжити з Google
            </Button>
          </div>
        </div>
      </div>
      <p className="mb-4 mt-5 text-sm">
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

export default SignUpForm;
