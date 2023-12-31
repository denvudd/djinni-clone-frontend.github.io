import React from 'react';
import Link from 'next/link';

import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Bookmark, Check } from 'lucide-react';
import clsx from 'clsx';

import UserAvatar from '../UserAvatar';
import OfferPanel from './panel/OfferPanel';

import { EnglishLevel } from '@/lib/enums';
import { formatEnglishLevel, formatExperience, formatRefusalReason } from '@/lib/utils';
import { type EmployerOffer as EmployerOfferType } from '@/types';

interface EmployerOfferProps {
  candidateId: string;
  employerId: string;
  offerId: string;
  avatar: string | null;
  fullname: string | null;
  position: string;
  expectations: number;
  country: string;
  city: string;
  experience: number;
  english: EnglishLevel;
  replies: EmployerOfferType['replies'];
  refusals?: EmployerOfferType['refusal'];
  coverLetter: string;
  updatedAt: Date;

  isArchived?: boolean;
  isFavorite?: boolean;
}

const EmployerOffer: React.FC<EmployerOfferProps> = ({
  employerId,
  candidateId,
  offerId,
  avatar,
  city,
  country,
  english,
  expectations,
  experience,
  fullname,
  position,
  replies,
  refusals,
  coverLetter,
  updatedAt,

  isArchived = false,
  isFavorite = false,
}) => {
  const date = !!replies.length
    ? format(new Date(replies[replies.length - 1].updatedAt), 'PPP', {
        locale: uk,
      })
    : format(new Date(updatedAt), 'PPP', {
        locale: uk,
      });

  const isRefused = !!refusals?.length;

  // if offer refused show refusal reason -> if not show last reply message -> if there is no replies then show cover letter
  let content;

  if (isRefused) {
    content = `Ви відмовили цьому кандидату. Причина: ${formatRefusalReason(refusals[0].reason)}`;
  } else if (replies.length) {
    content = replies.at(-1)?.text;
  } else {
    content = coverLetter;
  }

  return (
    <li className="border-borderColor group relative flex flex-col items-start gap-4 border-t p-6 md:flex-row">
      <div className="flex w-full items-start gap-3 md:max-w-[33.333%] md:flex-[0_0_33.333%]">
        <UserAvatar
          user={{
            avatar,
            fullname,
          }}
        />
        <div className="inline-flex flex-col">
          <Link
            href={`/q/${candidateId}`}
            className={clsx('text-primary truncate font-medium', {
              'flex gap-1 items-center font-semibold': isFavorite,
            })}
          >
            {isFavorite && <Bookmark className="fill-primary h-4 w-4" />}
            {fullname ?? '(Анонімний кандидат)'}
          </Link>
          <p className="text-gray">{position}</p>
          <ul className="text-gray inline">
            <li className="text-truncate inline">від ${expectations}</li>
            <span className="mx-1">·</span>
            <li className="text-truncate inline">
              {country}, {city}
            </li>
            <span className="mx-1">·</span>
            <li className="text-truncate inline">{formatExperience(experience)}</li>
            <span className="mx-1">·</span>
            <li className="text-truncate inline">{formatEnglishLevel(english).label}</li>
          </ul>
        </div>
      </div>
      <div className="flex w-full flex-col md:max-w-[77] md:flex-[0_0_77] md:flex-row">
        <Link href={`/home/inbox/${offerId}`} className="text-gray block w-full">
          <span className="inline-flex items-center gap-2 md:float-right md:ml-4">
            <Check className="h-4 w-4" />
            {date}
          </span>
          <p className="hover:text-gray-dark block w-full transition-colors">{content}</p>
        </Link>
      </div>
      <OfferPanel
        candidateId={candidateId}
        employerId={employerId}
        offerId={offerId}
        isArchived={isArchived}
        isFavorite={isFavorite}
      />
    </li>
  );
};

export default EmployerOffer;
