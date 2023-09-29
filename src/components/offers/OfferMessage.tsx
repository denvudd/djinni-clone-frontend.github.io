'use client';

import React from 'react';

import ReactMarkdown from 'react-markdown';
import { Check } from 'lucide-react';

import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';
import { MarkdownRender } from '../renderers/MarkdownRender';
import UserAvatar from '../UserAvatar';

interface OfferMessageProps {
  message: string;
  createdAt: Date;
  author: {
    avatar: string | null;
    name: string;
  };
}

const OfferMessage: React.FC<OfferMessageProps> = ({ message, createdAt, author }) => (
  <div className="relative w-full">
    <div className="mb-2 flex items-center gap-2">
      <UserAvatar
        user={{
          avatar: author.avatar,
          fullname: author.name,
        }}
        className="h-9 w-9"
      />
      <div className="flex flex-col">
        <strong>{author.name}</strong>
        <p className="text-gray text-sm">{format(new Date(createdAt), 'PPp', { locale: uk })}</p>
      </div>
    </div>
    <ReactMarkdown className="pr-2" components={MarkdownRender}>
      {message}
    </ReactMarkdown>
    <span className="absolute bottom-3 right-0">
      <Tooltip>
        <TooltipTrigger>
          <Check className="text-gray h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent>Повідомлення доставлено</TooltipContent>
      </Tooltip>
    </span>
  </div>
);

export default OfferMessage;
