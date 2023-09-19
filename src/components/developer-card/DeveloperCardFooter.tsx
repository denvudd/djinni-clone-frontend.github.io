'use client';

import React from 'react';
import { CardFooter } from '../ui/Card';
import Link from 'next/link';
import { Bookmark, Eye, MessageCircle } from 'lucide-react';
import clsx from 'clsx';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface DeveloperCardFooterProps {
  candidateId: string;
  employerId: string | undefined;
  isFavorite: boolean;
  favoriteId: string | undefined;
  views: number;
}

const DeveloperCardFooter: React.FC<DeveloperCardFooterProps> = ({
  candidateId,
  employerId,
  isFavorite,
  favoriteId,
  views,
}) => {
  const access = !!employerId;
  const router = useRouter();

  const { mutate: addToFavorite } = useMutation({
    mutationFn: async () => {
      if (access) {
        console.log('work');
        const { data } = await axios.post(
          `/employer/${employerId}/candidate-to-favorite`,
          {
            candidateId,
          },
        );

        if (data instanceof AxiosError) {
          throw new Error();
        }

        return data;
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
          `/employer/${employerId}/candidate-to-favorite/${favoriteId}`,
        );

        if (data instanceof AxiosError) {
          throw new Error();
        }

        return data;
      }
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  function onFavorite() {
    if (access) {
      if (isFavorite) {
        removeFromFavorite();
      } else {
        console.log('add');
        addToFavorite();
      }
    } else {
      router.push('/login');
    }
  }

  return (
    <CardFooter className="px-5 py-5 border-t border-borderColor flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link
          href={`/q/${candidateId}#poke_form`}
          className="text-primary inline-flex gap-1 items-center"
        >
          <MessageCircle className="w-5 h-5" /> Написати
        </Link>
        <button
          className={clsx('text-primary inline-flex gap-1 items-center', {
            'font-semibold': isFavorite,
          })}
          onClick={() => onFavorite()}
        >
          <Bookmark
            className={clsx('w-5 h-5', {
              'fill-primary': isFavorite,
            })}
          />{' '}
          Зберегти
        </button>
      </div>
      <span className="inline-flex gap-1 items-center text-gray">
        <Eye className="w-5 h-5" /> {views}
      </span>
    </CardFooter>
  );
};

export default DeveloperCardFooter;
