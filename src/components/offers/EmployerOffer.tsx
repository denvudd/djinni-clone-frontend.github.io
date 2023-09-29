import React from 'react';
import Link from 'next/link';

import { Bookmark, Check } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import clsx from 'clsx';
import UserAvatar from '../UserAvatar';
import ArchiveEmployerButton from './panel/ArchiveEmployerButton';

import { EnglishLevel } from '@/lib/enums';
import { formatEnglishLevel, formatExperience, formatRefusalReason } from '@/lib/utils';
import { type EmployerOffer } from '@/types';
import FavoriteEmployerButton from './panel/FavoriteEmployerButton';
import OfferPanel from './panel/OfferPanel';

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
  replies: EmployerOffer['replies'];
  refusals?: EmployerOffer['refusal'];
  coverLetter: string;
  updatedAt: Date;

  isArchived?: boolean;
  isFavorite?: boolean;
}

// some es-lint bug idk
// eslint-disable-next-line @typescript-eslint/no-redeclare
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
    <li className="p-6 flex items-start gap-4 border-t border-borderColor group relative">
      <div className="flex items-start gap-3 w-full md:flex-[0_0_33.333%] md:max-w-[33.333%]">
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
            {isFavorite && <Bookmark className="w-4 h-4 fill-primary" />}
            {fullname ?? '(Анонімний кандидат)'}
          </Link>
          <p className="text-gray">{position}</p>
          <ul className="inline text-gray">
            <li className="inline text-truncate">від ${expectations}</li>
            <span className="mx-1">·</span>
            <li className="inline text-truncate">
              {country}, {city}
            </li>
            <span className="mx-1">·</span>
            <li className="inline text-truncate">{formatExperience(experience)}</li>
            <span className="mx-1">·</span>
            <li className="inline text-truncate">{formatEnglishLevel(english).label}</li>
          </ul>
        </div>
      </div>
      <div className="flex w-full md:flex-[0_0_77] md:max-w-[77]">
        <Link href={`/home/inbox/${offerId}`} className="block w-full text-gray">
          <span className="inline-flex items-center gap-2 float-right ml-4">
            <Check className="w-4 h-4" />
            {date}
          </span>
          <p className="block hover:text-gray-dark transition-colors w-full">{content}</p>
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
