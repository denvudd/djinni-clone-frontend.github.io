'use client';

import React from 'react';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './Alert';

interface ErrorAlertProps {
  title?: string;
  description?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  description = 'Схоже, щось пішло не так. Обіцяємо, що ми вже працюємо над цим!',
  title = 'Упс!',
}) => (
  <Alert variant="destructive" className="mb-5">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
  </Alert>
);

export default ErrorAlert;
