'use client';

import React from 'react';

import UserAvatar from '../UserAvatar';
import ReactMarkdown from 'react-markdown';
import { MarkdownRender } from '../renderers/MarkdownRender';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';
import { Check } from 'lucide-react';

import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

interface OfferMessageProps {
  message: string;
  createdAt: Date;
  author: {
    avatar: string | null;
    name: string;
  };
}

const OfferMessage: React.FC<OfferMessageProps> = ({
  message,
  createdAt,
  author,
}) => {
  return (
    <div className="w-full relative">
      <div className="flex items-center gap-2 mb-2">
        <UserAvatar
          user={{
            avatar: author.avatar,
            fullname: author.name,
          }}
          className="w-9 h-9"
        />
        <div className="flex flex-col">
          <strong>{author.name}</strong>
          <p className="text-gray text-sm">
            {format(new Date(createdAt), 'PPp', { locale: uk })}
          </p>
        </div>
      </div>
      <ReactMarkdown className="pr-2" components={MarkdownRender}>
        {message}
      </ReactMarkdown>
      <span className="absolute bottom-3 right-0">
        <Tooltip>
          <TooltipTrigger>
            <Check className="w-4 h-4 text-gray" />
          </TooltipTrigger>
          <TooltipContent>Повідомлення доставлено</TooltipContent>
        </Tooltip>
      </span>
    </div>
  );
};

export default OfferMessage;
