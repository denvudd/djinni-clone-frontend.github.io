import React from 'react';
import Link from 'next/link';

import { formatDistance } from 'date-fns';
import { uk } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import DeveloperCardFooter from './DeveloperCardFooter';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { MarkdownRender } from '../renderers/MarkdownRender';
import { Badge } from '../ui/Badge';

import { type EnglishLevel } from '@/lib/enums';
import { type Skill } from '@/types';
import { cn, formatEnglishLevel, formatExperience } from '@/lib/utils';

const TRUNCATE_TEXT_LENGTH = 450;

interface DeveloperCardProps {
  id: string;
  title: string;
  expectations: number;
  country: string;
  city: string;
  experience: number;
  english: EnglishLevel;
  createdAt: Date;
  description: string;
  skills: Skill[];
  views: number;
  isFavorite: boolean;
  favoriteId: string | undefined;
  employerId?: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  id,
  city,
  country,
  createdAt,
  description,
  english,
  expectations,
  experience,
  skills,
  title,
  views,
  isFavorite,
  favoriteId,
  employerId,
}) => {
  const isDescriptionTruncated = description.length > TRUNCATE_TEXT_LENGTH;
  const truncateDescription = isDescriptionTruncated
    ? `${description.slice(0, TRUNCATE_TEXT_LENGTH)}...`
    : description;

  return (
    <Card>
      <CardHeader className="p-5">
        <CardTitle>
          <Link
            href={`/q/${id}`}
            className="flex flex-col items-start justify-between sm:flex-row sm:items-center"
          >
            <span className="text-primary text-2xl font-semibold leading-tight">{title}</span>
            <span className="text-green text-2xl font-semibold leading-tight">${expectations}</span>
          </Link>
        </CardTitle>
        <ul className="text-gray flex flex-wrap items-center text-sm">
          <li>{country}</li>
          <span className="mx-1">·</span>
          <li>{city}</li>
          <span className="mx-1">·</span>
          <li>{formatExperience(experience)}</li>
          <span className="mx-1">·</span>
          <li>{formatEnglishLevel(english).label}</li>
          <span className="mx-1">·</span>
          <li>
            Опубліковано{' '}
            {formatDistance(new Date(createdAt), new Date(), {
              locale: uk,
            })}{' '}
            тому
          </li>
        </ul>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 p-5 pt-0">
        <div className="pb-3">
          <div className="overflow-hidden text-ellipsis">
            <ReactMarkdown components={MarkdownRender}>{truncateDescription}</ReactMarkdown>
          </div>
          {isDescriptionTruncated && (
            <Link href={`/q/${id}`} className="text-primary">
              Детальніше
            </Link>
          )}
        </div>
        <ul className="flex flex-wrap items-center gap-1">
          {skills.map((skill) => (
            <li key={skill.id}>
              <Badge
                className={cn(
                  'text-dark-gray dark:text-gray border-borderColor pointer-events-none bg-transparent text-sm font-bold leading-[1.3] shadow-none',
                )}
              >
                {skill.name}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
      <DeveloperCardFooter
        candidateId={id}
        isFavorite={isFavorite}
        views={views}
        employerId={employerId}
        favoriteId={favoriteId}
      />
    </Card>
  );
};

export default DeveloperCard;
