import React from 'react';

import Link from 'next/link';
import { formatDistance } from 'date-fns';
import { uk } from 'date-fns/locale';

import { Clock } from 'lucide-react';
import UserAvatar from '../UserAvatar';

import { CompanyType, EmploymentOption, EnglishLevel } from '@/lib/enums';
import { formatEnglishLevel, formatExperience } from '@/lib/utils';
import JobCardStats from './JobCardStats';
import JobCardFavoriteButton from './JobCardFavoriteButton';

const TRUNCATE_TEXT_LENGTH = 280;

interface JobCardProps {
  id: string;
  favoriteId: string;
  candidateId: string | undefined;
  name: string;
  createdAt: Date;
  views: number;
  responsesCount: number;
  description: string;
  city: string;
  country: string;
  companyType: CompanyType;
  employmentOptions: EmploymentOption;
  experience: number;
  english: EnglishLevel;
  salaryForkGte: number;
  salaryForkLte: number;
  isFavorite: boolean;

  employer: {
    id: string;
    fullname: string;
    positionAndCompany: string;
    user: {
      avatar: string;
    }[];
  };
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  favoriteId,
  candidateId,
  city,
  companyType,
  country,
  createdAt,
  employer,
  employmentOptions,
  english,
  experience,
  salaryForkGte,
  salaryForkLte,
  name,
  description,
  responsesCount,
  views,
  isFavorite,
}) => {
  const isDescriptionTruncated = description.length > TRUNCATE_TEXT_LENGTH;
  const truncateDescription = isDescriptionTruncated
    ? `${description.slice(0, TRUNCATE_TEXT_LENGTH)}...`
    : description;

  return (
    <div className="relative flex flex-col">
      <div className="mb-2 inline-flex items-center text-sm">
        <div className="inline-flex items-center gap-2">
          <UserAvatar
            user={{
              avatar: employer.user[0].avatar,
              fullname: employer.fullname,
            }}
            className="h-5 w-5"
          />
          <span className="text-link">{employer.fullname}</span>
        </div>

        <span className="text-darkGray mx-2 font-semibold">·</span>

        <div className="text-gray inline-flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {formatDistance(new Date(createdAt), new Date(), {
            locale: uk,
          })}
        </div>

        <JobCardStats responsesCount={responsesCount} views={views} />
      </div>

      <span className="group relative">
        <Link
          href={`/jobs/${id}`}
          className="text-primary mb-1 text-xl font-semibold visited:text-blue-800"
          target="_blank"
        >
          {name}
        </Link>
        <span className="text-green ml-2 text-xl font-semibold">
          {!!salaryForkGte && !!salaryForkLte && `$${salaryForkGte} - $${salaryForkLte}`}
        </span>
        <JobCardFavoriteButton
          candidateId={candidateId}
          favoriteId={favoriteId}
          isFavorite={isFavorite}
          vacancyId={id}
        />
      </span>

      <div className="mb-1 inline-flex flex-wrap items-center font-medium">
        <span>
          {country} {city && `(${city})`}
        </span>
        <span className="text-darkGray mx-2 font-semibold">·</span>
        <span>{companyType}</span>
        <span className="text-darkGray mx-2 font-semibold">·</span>
        <span>{employmentOptions}</span>
        <span className="text-darkGray mx-2 font-semibold">·</span>
        <span>{formatExperience(experience)}</span>
        <span className="text-darkGray mx-2 font-semibold">·</span>
        <span>{formatEnglishLevel(english).label}</span>
      </div>

      <div className="inline-block">
        <p className="inline overflow-hidden text-ellipsis">{truncateDescription}</p>
        {isDescriptionTruncated && (
          <Link href={`/jobs/${id}`} className="text-primary inline" target="_blank">
            {' '}
            Детальніше
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;
