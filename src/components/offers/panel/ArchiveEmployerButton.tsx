'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

import { ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../../ui/Button';

interface ArchiveEmployerButtonProps {
  offerId: string;
  employerId: string;
  candidateId: string;
}

const ArchiveEmployerButton: React.FC<ArchiveEmployerButtonProps> = ({
  candidateId,
  employerId,
  offerId,
}) => {
  const router = useRouter();

  const { mutate: moveOfferToArchive } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(
        `/employer/${employerId}/offer/${offerId}/archive`,
        { candidateId },
      );

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        router.refresh();
      }
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);
      router.push('/home/inbox?error=true');
    },
  });

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          buttonVariants({
            variant: 'ghost',
          }),
        )}
        onClick={() => moveOfferToArchive()}
      >
        <ThumbsDown className="w-5 h-5 text-gray" />
      </TooltipTrigger>
      <TooltipContent>Перемістити до Архіву</TooltipContent>
    </Tooltip>
  );
};

export default ArchiveEmployerButton;
