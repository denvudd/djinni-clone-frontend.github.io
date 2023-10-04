import React from 'react';

import { Globe, Zap, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

import { EmploymentOption, EnglishLevel } from '@/lib/enums';
import { cn, formatEmploymenOptions, formatEnglishLevel, formatExperience } from '@/lib/utils';
import { Separator } from './ui/Separator';

interface CandidateInfoProps extends React.ComponentProps<typeof Card> {
  expectations: number;
  country: string;
  city: string;
  isRelocate: boolean;
  experience: number;
  english: EnglishLevel;
  employmentOptions: EmploymentOption;
}

const CandidateInfo: React.FC<CandidateInfoProps> = ({
  className,
  city,
  country,
  employmentOptions,
  english,
  expectations,
  experience,
  ...props
}) => (
  <Card
    className={cn('w-full rounded-lg border-neutral-200 bg-transparent p-0 shadow-none', className)}
    {...props}
  >
    <CardHeader className="text-green px-5 py-4">
      <CardTitle className="text-lg">${expectations} / місяць</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent className="p-5">
      <ul className="space-y-1">
        <li className="flex items-center gap-2">
          <Globe className="text-gray h-4 w-4" />
          {country}, {city}
        </li>
        <li className="flex items-center gap-2">
          <Zap className="text-gray h-4 w-4" />
          {formatExperience(experience)}
        </li>
        <li className="flex items-center gap-2">
          <MessageCircle className="text-gray h-4 w-4" />
          Англійська: {formatEnglishLevel(english).label}
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle2 className="text-gray h-4 w-4" />
          {formatEmploymenOptions(employmentOptions)}
        </li>
      </ul>
    </CardContent>
  </Card>
);

export default CandidateInfo;
