'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

import { FileBadge, MoreHorizontal, Trash } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover';
import { Button } from './ui/Button';

import axios from '@/lib/axios';
import { type CandidateResume } from '@/types';

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
  const router = useRouter();

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
    onSuccess: () => {
      window.location.reload(); // hard reload to reset date cache and get actual data
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
    },
  });

  return (
    <div className="border-dark flex items-center justify-between gap-2 rounded-md border p-2">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span>
            <FileBadge className="text-link h-5 w-5" />
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
          <PopoverContent className="w-full max-w-xl">
            <Button
              isLoading={isResumeLoading}
              onClick={() => deleteResume()}
              variant="destructive"
              className="flex items-center gap-2"
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
