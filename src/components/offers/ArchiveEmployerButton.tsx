'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { ThumbsDown } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

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
    },
  });

  return (
    <div className="hidden group-hover:block absolute right-5 top-5 z-10 shadow-[0_0_8px_0_rgba(0,0,0,.04),_0_0_0_1px_rgba(0,0,0,.04)] bg-background rounded-md p-1">
      <ul className="flex items-center">
        <li>
          <Button variant="ghost" onClick={() => moveOfferToArchive()}>
            <ThumbsDown className="w-5 h-5 text-gray" />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ArchiveEmployerButton;
