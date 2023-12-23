'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import CandidateAccountResume from '@/components/CandidateAccountResume';

import axios from '@/lib/axios';
import { useUploadThing } from '@/lib/uploadthing';
import {
  CandidateAccountValidator,
  type CandidateAccountRequest,
} from '@/lib/validators/candidate-account/candidate-account';
import { type CandidateResume, type CandidateProfile } from '@/types';

export type FileWithPreview = File & {
  preview: string;
};

interface CandidateResumePayload {
  resumeUrl: string;
  name: string;
  isMain: boolean;
}

interface CandidateAccountProps {
  candidateId: string;
  accessToken: string;
  fullname: string | undefined;
  email: string | undefined;
  skype: string | undefined;
  phone: string | undefined;
  telegram: string | undefined;
  whatsApp: string | undefined;
  linkedIn: string | undefined;
  github: string | undefined;
  portfolio: string | undefined;
}

const CandidateAccount: React.FC<CandidateAccountProps> = (props) => {
  const { candidateId, accessToken } = props;
  const router = useRouter();

  const { isUploading, startUpload } = useUploadThing('userResumeUploader');
  const [isAddResume, setIsAddResume] = React.useState<boolean>(false);
  const [resume, setResume] = React.useState<FileWithPreview | undefined>();

  const form = useForm<CandidateAccountRequest>({
    resolver: zodResolver(CandidateAccountValidator),
    defaultValues: {
      ...props,
    },
  });

  const {
    mutate: updateAccount,
    isLoading: isAccountLoading,
    isError: isAccountError,
  } = useMutation({
    mutationFn: async (values: CandidateAccountRequest) => {
      const payload: CandidateAccountRequest = {
        ...values,
      };

      const { data } = await axios.patch(`/candidate/${candidateId}`, payload);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as CandidateProfile;
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const {
    mutate: addResume,
    isLoading: isResumeLoading,
    isError: isResumeError,
  } = useMutation({
    mutationFn: async (resume: { id: string; name: string; url: string }) => {
      const payload: CandidateResumePayload = {
        resumeUrl: resume.url,
        name: resume.name,
        isMain: false,
      };

      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + `/candidate/${candidateId}/resume`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as CandidateResume;
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      setIsAddResume(false);
      setResume(undefined);
    },
  });

  const {
    data: existResume,
    isLoading: isExistResumeLoading,
    isError: isExistResumeError,
  } = useQuery({
    queryKey: ['resume'],
    queryFn: async () => {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + `/candidate/${candidateId}/resume`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return data as CandidateResume[];
    },
  });

  async function onSubmit(values: CandidateAccountRequest) {
    if (!!resume) {
      const resumeFiles = await startUpload([resume]).then((res) => {
        const formattedResume = res?.map((resumeFile) => ({
          id: resumeFile.key,
          name: resumeFile.name,
          url: resumeFile.url,
        }));

        return formattedResume ?? null;
      });

      if (resumeFiles) {
        await Promise.all([addResume(resumeFiles[0]), updateAccount(values)]).then(() => {
          setIsAddResume(false);
          setResume(undefined);
          router.push('/my/account?updated=ok');
          window.location.reload(); // hard reload to reset date cache and get actual data
        });
      }
    } else {
      updateAccount(values);
      router.push('/my/account?updated=ok');
      router.refresh();
    }
  }

  const onResumeInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const file = e.target.files?.[0];

      if (file) {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        setResume(fileWithPreview);
      }
    },
    [resume],
  );

  const onAddMoreResume = () => {
    setIsAddResume(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-6">
        {(isAccountError || isResumeError) && <ErrorAlert />}
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-baseline">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Ім&apos;я та прізвище
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Input className="text-base" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="mt-1 text-sm">
                  Повне ім&apos;я, будь ласка. Не треба писати Слава С.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skype"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Skype
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Input className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Телефон
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Input className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telegram"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Telegram
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Input className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsApp"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                WhatsApp
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Input className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedIn"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-baseline">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                LinkedIn-профіль
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Input className="text-base" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription className="mt-1 text-sm">
                  Посилання на ваш{' '}
                  <a
                    className="text-link"
                    href="https://www.linkedin.com/in/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    LinkedIn профіль
                  </a>
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="github"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Github
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Input className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
              <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
                Portfolio{' '}
                <Tooltip>
                  <TooltipTrigger className="text-link ml-1">[?]</TooltipTrigger>
                  <TooltipContent>
                    Можна вказати будь-яке посилання: Behance, Dropbox, Google Docs, etc.
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
                <FormControl>
                  <Input className="text-base" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormItem className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-baseline">
          <FormLabel className="h-full pt-2 text-base font-semibold sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]">
            Резюме{' '}
            <Tooltip>
              <TooltipTrigger className="text-link ml-1">[?]</TooltipTrigger>
              <TooltipContent>
                Роботодавцям зручніше працювати з PDF та назвою файла CV_Imya_Pryzvysche.pdf
              </TooltipContent>
            </Tooltip>
          </FormLabel>
          <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
            {!!existResume?.length && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  {existResume.map((resume) => (
                    <CandidateAccountResume
                      candidateId={candidateId}
                      resumeId={resume.id}
                      isMain={resume.isMain}
                      key={resume.id}
                      name={resume.name}
                      url={resume.resumeUrl}
                      createdAt={resume.createdAt}
                    />
                  ))}
                </div>
                <div className="block space-y-2">
                  {isAddResume && (
                    <>
                      <FormControl>
                        <Input
                          id="resume-upload"
                          type="file"
                          className="p-0 text-base file:h-full file:bg-gray-100 file:px-3 file:py-2"
                          onChange={onResumeInput}
                          disabled={isExistResumeLoading || isExistResumeError}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="mt-1">
                        Djinni приймає тільки резюме в форматі PDF і розміром до 16MB.
                      </FormDescription>
                    </>
                  )}
                  {!isAddResume && existResume.length !== 3 && (
                    <Button type="button" className="px-0" onClick={onAddMoreResume} variant="link">
                      + Додати резюме
                    </Button>
                  )}
                  <FormDescription>Ви можете завантажити до 3 файлів резюме.</FormDescription>
                </div>
              </div>
            )}
            {!existResume?.length && (
              <>
                <FormControl>
                  <Input
                    id="resume-upload"
                    type="file"
                    className="p-0 text-base file:h-full file:bg-gray-100 file:px-3 file:py-2"
                    onChange={onResumeInput}
                    disabled={isExistResumeLoading || isExistResumeError}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription className="mt-1">
                  Djinni приймає тільки резюме в форматі PDF і розміром до 16MB.
                </FormDescription>
              </>
            )}
          </div>
        </FormItem>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-3 md:items-center">
          <div className="sm:max-w-[33.33333%] sm:flex-[0_0_33.33333%]" />
          <div className="w-full sm:max-w-[63.33333%] sm:flex-[0_0_63.33333%]">
            <Button
              type="submit"
              isLoading={isAccountLoading || isResumeLoading}
              className="text-lg"
            >
              Зберегти зміни
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CandidateAccount;
