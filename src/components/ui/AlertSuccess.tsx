import React from 'react';
import { Alert, AlertDescription } from './Alert';
import { cn } from '@/lib/utils';

interface AlertSuccessProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: React.ReactElement | string;
}

const AlertSuccess: React.FC<AlertSuccessProps> = ({
  message = 'Повідомлення надіслано.',
  className,
  ...props
}) => {
  return (
    <Alert className={cn('bg-green-subtle w-full', className)}>
      <AlertDescription className="text-base">{message}</AlertDescription>
    </Alert>
  );
};

export default AlertSuccess;
