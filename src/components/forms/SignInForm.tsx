'use client';

import React from 'react';
import Link from 'next/link';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginRequest, LoginValidator } from '@/lib/validators/auth/login';

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
import ErrorAlert from '@/components/ui/ErrorAlert';
import { Icons } from '@/components/ui/Icons';

const SignInForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    mutate: login,
    isLoading: isLoginLoading,
    isError: isLoginError,
  } = useMutation({
    mutationFn: async ({ username, password }: LoginRequest) => {
      const res = await signIn('credentials', {
        redirect: false,
        username,
        password,
        callbackUrl,
      });

      if (res?.error === '401') {
        form.setError('password', {
          type: 'custom',
          message: 'Неправильний пароль або email',
        });
        form.setError('username', {
          type: 'custom',
          message: 'Неправильний пароль або email',
        });
      }

      // in case if database down
      if (res?.error === 'fetch failed') {
        throw new Error();
      }

      if (!res?.ok) {
        throw new Error();
      }

      return res;
    },
    onSuccess: (data) => {
      if (data?.error !== '401') {
        router.push(callbackUrl);
        router.refresh();
      }
    },
    onError: (error) => {
      router.push('/error');
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  function onSubmit(values: LoginRequest) {
    login(values);
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      {isLoginError && <ErrorAlert />}
      <h1 className="mb-5 text-4xl font-semibold">Увійти на Джин</h1>
      <div className="flex">
        <div className="border-borderColor flex-1 border-r pr-9">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="username"
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
              <div className="inline-block">
                <Button isLoading={isLoginLoading} type="submit" className="text-lg">
                  Увійти
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
      <ul className="mt-5 flex gap-2">
        <li>
          <Link href="/signup" className="text-link">
            Зареєструватись
          </Link>
        </li>
        <li className="text-gray">·</li>
        <li>
          <Link href="/remind" className="text-link">
            Забули пароль?
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SignInForm;
