'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Bookmark } from 'lucide-react';
import axios from '@/lib/axios';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

import { cn } from '@/lib/utils';
import { buttonVariants } from '../../ui/Button';

interface FavoriteEmployerButtonProps {
  offerId: string;
  employerId: string;
  candidateId: string;
}

const FavoriteEmployerButton: React.FC<FavoriteEmployerButtonProps> = ({
  candidateId,
  employerId,
  offerId,
}) => {
  const router = useRouter();

  const { mutate: moveOfferToFavorite } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.patch(`/employer/${employerId}/offer/${offerId}/favorite`, {
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

  const handleMoveOfferToFavorite = React.useCallback(() => moveOfferToFavorite(), []);

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          buttonVariants({
            variant: 'ghost',
            className: 'pl-0 sm:px-2 sm:py-4',
          }),
        )}
        onClick={handleMoveOfferToFavorite}
      >
        <Bookmark className="text-gray h-6 w-6 sm:h-5 sm:w-5" />
      </TooltipTrigger>
      <TooltipContent>Зберегти</TooltipContent>
    </Tooltip>
  );
};

export default FavoriteEmployerButton;
