'use client';

import React from 'react';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';

import AvatarUploader from '@/components/avatar-uploader/AvatarUploader';
import { useUploadThing } from '@/lib/uploadthing';
import { type EmployerProfile } from '@/types';

export type FileWithPreview = File & {
  preview: string;
};

interface EmployerAvatarFormProps {
  avatar: string | null;
  fullname: string | null;
  userId: string;
  accessToken: string;
}

const EmployerAvatarForm: React.FC<EmployerAvatarFormProps> = ({
  avatar,
  fullname,
  userId,
  accessToken,
}) => {
  const router = useRouter();

  const [image, setImage] = React.useState<FileWithPreview | undefined>(undefined);
  const [isPreview, setIsPreview] = React.useState<boolean>(false);
  const { isUploading, startUpload } = useUploadThing('userAvatarUploader');
  const { update } = useSession();

  const { mutate: changeAvatar, isLoading: isAvatarLoading } = useMutation({
    mutationFn: async ({ avatar }: { avatar: string | null }) => {
      const payload = { avatar };

      const { data } = await axios.patch(
        process.env.NEXT_PUBLIC_BACKEND_API_URL + `/user/${userId}`,
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

      const updateSession = await update({ avatar });

      return data as EmployerProfile;
    },
    onSuccess: () => {
      router.push('/home/profile?updated=ok');
      router.refresh();

      setImage(undefined);
      setIsPreview(false);
    },
    onError: (error) => {
      console.log('%c[DEV]:', 'background-color: yellow; color: black', error);

      setIsPreview(false);
      setImage(undefined);
    },
  });

  return (
    <div className="relative flex justify-center">
      <AvatarUploader
        avatar={avatar}
        reqFunc={changeAvatar}
        fullname={fullname}
        image={image}
        setImage={setImage}
        isAvatarLoading={isAvatarLoading}
        isUploading={isUploading}
        startUpload={startUpload}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
      />
    </div>
  );
};

export default EmployerAvatarForm;
