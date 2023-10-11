import React from 'react';

import { UploadFileResponse } from 'uploadthing/client';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { Camera, MoreHorizontal, XCircle } from 'lucide-react';

import { Button, buttonVariants } from '../ui/Button';
import UserAvatar from '../UserAvatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';

import 'cropperjs/dist/cropper.css';

export type FileWithPreview = File & {
  preview: string;
};

interface AvatarUploaderProps {
  setImage: React.Dispatch<React.SetStateAction<FileWithPreview | undefined>>;
  reqFunc: (avatar: { avatar: string | null }) => void;
  startUpload: (files: File[], input?: undefined) => Promise<UploadFileResponse[] | undefined>;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
  image: FileWithPreview | undefined;
  avatar: string | null;
  fullname: string | null;
  isPreview: boolean;
  isAvatarLoading: boolean;
  isUploading: boolean;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  setImage,
  reqFunc,
  startUpload,
  setIsPreview,
  avatar,
  fullname,
  image,
  isPreview,
  isAvatarLoading,
  isUploading,
}) => {
  const [isPending, startTransition] = React.useTransition();
  const [cropData, setCropData] = React.useState<string | null>();

  const cropperRef = React.createRef<ReactCropperElement>();

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

          reqFunc({ avatar: images?.at(0)?.url ?? null });
        } catch (err) {
          console.error(err);
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
    reqFunc({ avatar: null });
  }, []);

  return isPreview ? (
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
          <div data-cropper-preview="preview" className="h-12 w-12 overflow-hidden rounded-full" />
          <div data-cropper-preview="preview" className="h-8 w-8 overflow-hidden rounded-full" />
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
        <PopoverTrigger className="absolute right-2 top-2 sm:right-0 sm:top-0">
          <MoreHorizontal className="h-5 w-5 sm:h-4 sm:w-4" />
        </PopoverTrigger>
        <PopoverContent align="end" className="max-w-[220px]">
          <div className="flex flex-col justify-center gap-2">
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
  );
};

export default AvatarUploader;
