'use client';

import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

import { FileBadge, FileText, MoreHorizontal, Trash } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover';
import { Button } from './ui/Button';

import axios from '@/lib/axios';
import { type CandidateResume } from '@/types';
import { cn } from '@/lib/utils';

interface CandidateAccountResumeProps {
  candidateId: string;
  resumeId: string;
  name: string;
  url: string;
  isMain: boolean;
  createdAt: Date;
}

const CandidateAccountResume: React.FC<CandidateAccountResumeProps> = ({
  candidateId,
  resumeId,
  isMain,
  name,
  url,
  createdAt,
}) => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteResume,
    isLoading: isResumeLoading,
    isError: isResumeError,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete(`/candidate/${candidateId}/resume/${resumeId}`);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as CandidateResume;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['resume']);
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  const {
    mutate: updateIsMain,
    isLoading: isUpdateIsMainLoading,
    isError: isUpdateIsMainError,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`/candidate/${candidateId}/resume/${resumeId}/main`, {
        isMain: true,
      });

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as CandidateResume;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['resume']);
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  return (
    <div
      className={cn('flex items-center justify-between gap-2 rounded-md border p-2', {
        'border-dark': isMain,
        'border-gray-300': !isMain,
      })}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span>
            {isMain ? (
              <FileBadge className="text-link h-5 w-5" />
            ) : (
              <FileText className="text-link h-5 w-5" />
            )}
          </span>
          <a href={url} target="_blank" rel="noreferrer" className="text-link text-base">
            {name}
          </a>
        </div>
        <p className="text-gray text-sm">
          Завантажено: {format(new Date(createdAt), 'PP', { locale: uk })}
        </p>
      </div>
      <span>
        <Popover>
          <PopoverTrigger>
            <MoreHorizontal className="h-4 w-4 opacity-50" />
          </PopoverTrigger>
          <PopoverContent className="flex w-full max-w-xl flex-col justify-start gap-2">
            {!isMain && (
              <Button
                isLoading={isUpdateIsMainLoading}
                onClick={() => updateIsMain()}
                variant="link"
                className="text-dark flex w-full items-center justify-start gap-2 p-0"
              >
                <FileBadge className="h-4 w-4" />
                Встановити як основне резюме
              </Button>
            )}
            <Button
              isLoading={isResumeLoading}
              onClick={() => deleteResume()}
              variant="link"
              className="text-red flex w-full items-center justify-start gap-2 p-0"
            >
              <Trash className="h-4 w-4" />
              Видалити
            </Button>
          </PopoverContent>
        </Popover>
      </span>
    </div>
  );
};

export default CandidateAccountResume;
