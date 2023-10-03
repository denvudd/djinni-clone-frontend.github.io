'use client';

import React from 'react';

import { useSession } from 'next-auth/react';
import { Camera, MoreHorizontal, XCircle } from 'lucide-react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import UserAvatar from '@/components/UserAvatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Button, buttonVariants } from '@/components/ui/Button';
import { useUploadThing } from '@/lib/uploadthing';
import { EmployerProfile } from '@/types';

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
  const [cropData, setCropData] = React.useState<string | null>();
  const [isPending, startTransition] = React.useTransition();

  const { isUploading, startUpload } = useUploadThing('userAvatarUploader');
  const { update } = useSession();

  const cropperRef = React.createRef<ReactCropperElement>();

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

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const file = e.target.files?.[0];

      if (file) {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        setImage(fileWithPreview);
        setIsPreview(true);
      }
    },
    [image],
  );

  const onCrop = React.useCallback(() => {
    if (!image || !cropperRef.current) return;

    const croppedCanvas = cropperRef.current?.cropper.getCroppedCanvas();
    setCropData(croppedCanvas.toDataURL());

    // TODO: create separate component for this
    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        console.error('Blob creation failed');
        return;
      }
      const croppedImage = new File([blob], image.name, {
        type: image.type,
        lastModified: Date.now(),
      });

      const croppedFileWithPathAndPreview = Object.assign(croppedImage, {
        preview: URL.createObjectURL(croppedImage),
        path: image.name,
      }) satisfies FileWithPreview;

      const newFiles = croppedFileWithPathAndPreview;

      startTransition(async () => {
        try {
          const images = newFiles
            ? await startUpload([newFiles]).then((res) => {
                const formattedImages = res?.map((image) => ({
                  id: image.key,
                  name: image.key.split('_')[1] ?? image.key,
                  url: image.url,
                }));
                return formattedImages ?? null;
              })
            : null;

          changeAvatar({ avatar: images?.at(0)?.url ?? null });
        } catch (err) {
          console.log(err);
        }
      });
    });
  }, [image, setImage]);

  const onCancel = React.useCallback(() => {
    setIsPreview(false);
    setImage(undefined);
  }, []);

  const onDelete = React.useCallback(() => {
    setIsPreview(false);
    setImage(undefined);
    changeAvatar({ avatar: null });
  }, []);

  return (
    <div className="relative flex justify-center">
      {isPreview ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Cropper
              ref={cropperRef}
              style={{ width: '100%' }}
              zoomTo={0.5}
              initialAspectRatio={1}
              aspectRatio={1}
              preview="[data-cropper-preview]"
              src={image?.preview}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides
            />
            <div className="flex items-start gap-4">
              <div
                data-cropper-preview="preview"
                className="h-12 w-12 overflow-hidden rounded-full"
              />
              <div
                data-cropper-preview="preview"
                className="h-8 w-8 overflow-hidden rounded-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={onCrop}
              disabled={isAvatarLoading ?? isUploading}
              isLoading={isAvatarLoading ?? isUploading}
            >
              Зберегти
            </Button>
            <Button variant="outline" disabled={isAvatarLoading ?? isUploading} onClick={onCancel}>
              Скасувати
            </Button>
          </div>
        </div>
      ) : (
        <>
          <UserAvatar
            user={{
              avatar,
              fullname,
            }}
            className="h-52 w-52"
          />
          <Popover>
            <PopoverTrigger className="absolute right-0 top-0">
              <MoreHorizontal className="h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent align="end" className="max-w-[220px]">
              <div className="flex flex-col justify-center gap-2">
                {/* TODO: create separate button (maybe in separate component with image uploader) */}
                <input
                  type="file"
                  placeholder="Загрузити фото"
                  onChange={onChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className={buttonVariants()}>
                  <Camera className="mr-2 h-4 w-4" /> Завантажити фото
                </label>
                {avatar && (
                  <Button variant="destructive" onClick={onDelete}>
                    <XCircle className="mr-2 h-4 w-4" /> Видалити фото
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  );
};

export default EmployerAvatarForm;
