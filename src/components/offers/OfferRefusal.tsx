import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '../ui/Alert';
import { MarkdownRender } from '../renderers/MarkdownRender';
import ReactMarkdown from 'react-markdown';

import { formatRefusalReason } from '@/lib/utils';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { RefusalReason } from '@/lib/enums';

interface OfferRefusalProps {
  createdAt: Date;
  message: string;
  reason: RefusalReason;
}

const OfferRefusal: React.FC<OfferRefusalProps> = ({
  createdAt,
  message,
  reason,
}) => {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <p className="text-gray text-sm">
        {format(new Date(createdAt), 'PPp', {
          locale: uk,
        })}
      </p>
      <Alert className="bg-yellow-subtle text-yellow-900">
        <AlertTitle className="text-base font-semibold">
          Ви відзначили, що кандидат вам не підійшов
        </AlertTitle>
        <AlertDescription className="text-base">
          Причина відмови: {formatRefusalReason(reason)}
        </AlertDescription>
      </Alert>
      <ReactMarkdown components={MarkdownRender}>{message}</ReactMarkdown>
    </div>
  );
};

export default OfferRefusal;
