import React from 'react';

import { Building2, ShoppingBasket, MapPin, PenSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

import { CompanyType, EmploymentOption, EnglishLevel } from '@/lib/enums';
import {
  cn,
  formatClarifiedData,
  formatEmploymenOptions,
  formatEnglishLevel,
  formatExperience,
} from '@/lib/utils';
import { Separator } from './ui/Separator';
import { type ClarifiedData } from '@/types';

interface EmployerVacancyInfoProps extends React.ComponentProps<typeof Card> {
  category: string;
  english: EnglishLevel;
  experience: number;
  domain: string;
  employment: EmploymentOption;
  companyType: CompanyType;
  city: string | undefined;
  country: string;
  clarifiedData: ClarifiedData[];
}

const EmployerVacancyInfo: React.FC<EmployerVacancyInfoProps> = ({
  className,
  category,
  city,
  country,
  clarifiedData,
  companyType,
  domain,
  employment,
  english,
  experience,
  ...props
}) => (
  <Card
    className={cn('w-full rounded-lg border-neutral-200 bg-transparent p-0 shadow-none', className)}
    {...props}
  >
    <CardContent className="p-4">
      <ul className="flex flex-col gap-2 text-[15px]">
        <li className="inline-flex items-center">
          <span className="text-gray mr-2 h-4 w-4 text-center text-xs">•</span>
          Категорія: {category}
        </li>
        <li className="inline-flex items-center">
          <span className="text-gray mr-2 h-4 w-4 text-center text-xs">•</span>
          Англійська: {formatEnglishLevel(english).label}
        </li>
        <li className="inline-flex items-center">
          <span className="text-gray mr-2 h-4 w-4 text-center text-xs">•</span>
          {formatExperience(experience)}
        </li>
        <Separator className="my-2" />
        <li className="inline-flex items-center">
          <span className="text-gray mr-2 h-4 w-4 text-center text-xs">•</span>
          Домен: {domain}
        </li>
        <li className="inline-flex items-center">
          <span className="text-gray mr-2 text-xs">
            <Building2 className="text-gray-dark h-4 w-4" />
          </span>
          {formatEmploymenOptions(employment)}
        </li>
        <li className="inline-flex items-center">
          <span className="text-gray mr-2 text-xs">
            <ShoppingBasket className="text-gray-dark h-4 w-4" />
          </span>
          {companyType}
        </li>
        {city && (
          <li className="inline-flex items-center">
            <span className="text-gray mr-2 text-xs">
              <MapPin className="text-gray-dark h-4 w-4" />
            </span>
            {country} ({city})
          </li>
        )}
        {clarifiedData &&
          !!clarifiedData.length &&
          clarifiedData.map((item) => (
            <li className="inline-flex items-center">
              <span className="text-gray mr-2 text-xs">
                <PenSquare className="h-4 w-4" />
              </span>
              {formatClarifiedData(item.name)}
            </li>
          ))}
      </ul>
    </CardContent>
  </Card>
);

export default EmployerVacancyInfo;
