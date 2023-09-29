'use client';

import React from 'react';

import { MoreHorizontal } from 'lucide-react';
import UserAvatar from '@/components/UserAvatar';
import { buttonVariants } from '@/components/ui/Button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { UploadButton } from '@/lib/uploadthing';
import { cn } from '@/lib/utils';

interface EmployerAvatarFormProps {
  avatar: string | null;
  fullname: string | null;
  employerId: string;
}

const EmployerAvatarForm: React.FC<EmployerAvatarFormProps> = ({
  avatar,
  fullname,
  employerId,
}) => (
  <div className="relative flex justify-center">
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
      <PopoverContent>
        <div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res: unknown) => {
              // Do something with the response
              console.log('Files: ', res);
              alert('Upload Completed');
            }}
            className="ut-button:h-9 ut-button:px-4 ut-button:py-2 ut-button:inline-flex ut-button:items-center ut-button:justify-center ut-button:rounded-md 
              ut-button:text-sm ut-button:font-medium ut-button:transition-colors ut-button:focus-visible:outline-none ut-button:focus-visible:ring-1 
              ut-button:focus-visible:ring-ring ut-button:disabled:pointer-events-none ut-button:disabled:opacity-50 ut-button:bg-primary ut-button:text-primary-foreground 
              ut-button:shadow ut-button:hover:bg-primary/90"
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
            content={{
              button: 'Загрузити фото',
              allowedContent: 'Зображення до 4 МБ',
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  </div>
);

export default EmployerAvatarForm;
