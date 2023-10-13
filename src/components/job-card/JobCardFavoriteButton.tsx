'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import { AxiosError } from 'axios';
import axios from '@/lib/axios';

import { CandidateProfile, FavoriteVacancy } from '@/types';
import { cn } from '@/lib/utils';

interface JobCardFavoriteButtonProps {
  candidateId: string | undefined;
  vacancyId: string;
  isFavorite: boolean;
  favoriteId: string | undefined;
}

type EmployerWithFavorites = CandidateProfile & { favoriteVacancies: FavoriteVacancy[] };

const JobCardFavoriteButton: React.FC<JobCardFavoriteButtonProps> = ({
  candidateId,
  favoriteId,
  isFavorite,
  vacancyId,
}) => {
  const access = !!candidateId;
  const router = useRouter();

  const { mutate: addToFavorite } = useMutation({
    mutationFn: async () => {
      if (access) {
        const { data } = await axios.post(`/candidate/${candidateId}/vacancy-to-favorite`, {
          vacancyId,
        });

        if (data instanceof AxiosError) {
          throw new Error();
        }

        return data as EmployerWithFavorites;
      }
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const { mutate: removeFromFavorite } = useMutation({
    mutationFn: async () => {
      if (access) {
        const { data } = await axios.delete(
          `/candidate/${candidateId}/vacancy-to-favorite/${favoriteId}`,
        );

        if (data instanceof AxiosError) {
          throw new Error();
        }

        return data as { success: true; deletedCount: number };
      }
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  const onFavorite = React.useCallback(() => {
    if (access) {
      if (isFavorite) {
        removeFromFavorite();
      } else {
        addToFavorite();
      }
    } else {
      router.push('/login');
    }
  }, [access, isFavorite]);

  return (
    <button onClick={onFavorite} className="absolute -left-7 top-1 hidden pr-9 group-hover:block">
      <Star
        className={cn('text-primary h-5 w-5', {
          'fill-primary': isFavorite,
        })}
      />
    </button>
  );
};

export default JobCardFavoriteButton;
