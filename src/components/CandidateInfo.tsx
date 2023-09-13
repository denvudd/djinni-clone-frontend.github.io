import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

import { EmploymentOption, EnglishLevel } from '@/lib/enums';
import {
  cn,
  formatEmploymenOptions,
  formatEnglishLevel,
  formatExperience,
} from '@/lib/utils';
import { Separator } from './ui/Separator';
import { Globe, Zap, MessageCircle, CheckCircle2 } from 'lucide-react';

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
  isRelocate,
  ...props
}) => {
  return (
    <Card
      className={cn(
        'w-full bg-transparent rounded-lg border-neutral-200 shadow-none p-0',
        className,
      )}
      {...props}
    >
      <CardHeader className="py-4 px-5 text-green">
        <CardTitle className="text-lg">${expectations} / місяць</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-5">
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray" />
            {country}, {city}
          </li>
          <li className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-gray" />
            {formatExperience(experience)}
          </li>
          <li className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-gray" />
            Англійська: {formatEnglishLevel(english).label}
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gray" />
            {formatEmploymenOptions(employmentOptions)}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default CandidateInfo;
