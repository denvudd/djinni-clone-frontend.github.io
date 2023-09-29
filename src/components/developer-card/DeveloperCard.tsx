import React from 'react';
import Link from 'next/link';

import { formatDistance } from 'date-fns';
import { uk } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { type EnglishLevel } from '@/lib/enums';
import { type Skill } from '@/types';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { MarkdownRender } from '../renderers/MarkdownRender';
import { Badge } from '../ui/Badge';

import { cn, formatEnglishLevel, formatExperience } from '@/lib/utils';
import DeveloperCardFooter from './DeveloperCardFooter';

const TRUNCATE_TEXT_LENGTH = 450;
interface DeveloperCardProps {
  id: string;
  title: string;
  expectations: number;
  country: string;
  city: string;
  experience: number;
  english: EnglishLevel;
  updatedAt: Date;
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
  updatedAt,
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
          <Link href={`/q/${id}`} className="flex items-center justify-between">
            <span className="text-2xl text-primary font-semibold leading-tight">{title}</span>
            <span className="text-2xl text-green font-semibold leading-tight">${expectations}</span>
          </Link>
        </CardTitle>
        <ul className="flex items-center text-gray text-sm">
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
        <ul className="flex gap-1 flex-wrap items-center">
          {skills.map((skill) => (
            <li key={skill.id}>
              <Badge
                className={cn(
                  'pointer-events-none text-sm leading-[1.3] bg-transparent text-dark-gray dark:text-gray border-borderColor font-bold shadow-none',
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
