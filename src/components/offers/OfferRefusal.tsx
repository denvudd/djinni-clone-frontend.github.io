import React from 'react';

import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

import ReactMarkdown from 'react-markdown';
import { Alert, AlertDescription, AlertTitle } from '../ui/Alert';
import { MarkdownRender } from '../renderers/MarkdownRender';

import { formatRefusalReason } from '@/lib/utils';
import { RefusalReason } from '@/lib/enums';

interface OfferRefusalProps {
  createdAt: Date;
  message: string;
  reason: RefusalReason;
}

const OfferRefusal: React.FC<OfferRefusalProps> = ({ createdAt, message, reason }) => (
  <div className="mt-5 flex flex-col gap-2">
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

export default OfferRefusal;
