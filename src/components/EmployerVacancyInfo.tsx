import React from 'react';

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
import { Building2, ShoppingBasket, MapPin, PenSquare } from 'lucide-react';
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
}) => {
  return (
    <Card
      className={cn(
        'w-full bg-transparent rounded-lg border-neutral-200 shadow-none p-0',
        className,
      )}
      {...props}
    >
      <CardContent className="p-4">
        <ul className="flex flex-col gap-2 text-[15px]">
          <li className="inline-flex items-center">
            <span className="text-xs text-gray mr-2 w-4 h-4 text-center">
              •
            </span>
            Категорія: {category}
          </li>
          <li className="inline-flex items-center">
            <span className="text-xs text-gray mr-2 w-4 h-4 text-center">
              •
            </span>
            Англійська: {formatEnglishLevel(english).label}
          </li>
          <li className="inline-flex items-center">
            <span className="text-xs text-gray mr-2 w-4 h-4 text-center">
              •
            </span>
            {formatExperience(experience)}
          </li>
          <Separator className="my-2" />
          <li className="inline-flex items-center">
            <span className="text-xs text-gray mr-2 w-4 h-4 text-center">
              •
            </span>
            Домен: {domain}
          </li>
          <li className="inline-flex items-center">
            <span className="text-xs text-gray mr-2">
              <Building2 className="w-4 h-4 text-gray-dark" />
            </span>
            {formatEmploymenOptions(employment)}
          </li>
          <li className="inline-flex items-center">
            <span className="text-xs text-gray mr-2">
              <ShoppingBasket className="w-4 h-4 text-gray-dark" />
            </span>
            {companyType}
          </li>
          {city && (
            <li className="inline-flex items-center">
              <span className="text-xs text-gray mr-2">
                <MapPin className="w-4 h-4 text-gray-dark" />
              </span>
              {country} ({city})
            </li>
          )}
          {clarifiedData &&
            !!clarifiedData.length &&
            clarifiedData.map((item) => (
              <li className="inline-flex items-center">
                <span className="text-xs text-gray mr-2">
                  <PenSquare className="w-4 h-4" />
                </span>
                {formatClarifiedData(item.name)}
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default EmployerVacancyInfo;
