'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ThumbsDown } from 'lucide-react';
import axios from '@/lib/axios';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

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
      const { data } = await axios.patch(`/employer/${employerId}/offer/${offerId}/archive`, {
        candidateId,
      });

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as {
        success: boolean;
        active: boolean;
        isArchive: boolean;
        isFavorite: boolean;
        offerId: string;
      };
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

  const handleMoveOfferToArchive = React.useCallback(() => moveOfferToArchive(), []);

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          buttonVariants({
            variant: 'ghost',
            className: 'pl-0 sm:px-2 sm:py-4',
          }),
        )}
        onClick={handleMoveOfferToArchive}
      >
        <ThumbsDown className="text-gray h-6 w-6 sm:h-5 sm:w-5" />
      </TooltipTrigger>
      <TooltipContent>Перемістити до Архіву</TooltipContent>
    </Tooltip>
  );
};

export default ArchiveEmployerButton;
