'use client';

import React from 'react';
import { ListFilter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/Sheet';
import { Button } from '../ui/Button';
import { EmploymentOption, EnglishLevel } from '@/lib/enums';

interface SheetDevelopersProps {
  location: string;
  title: string;
  exp_from: string;
  exp_to: string;
  salary_min: string;
  salary_max: string;
  english_level: EnglishLevel;
  employment_options: EmploymentOption;
  ready_to_relocate: string;
  page: string;
  keywords: string;
}

const SheetDevelopers: React.FC<SheetDevelopersProps> = ({
  employment_options,
  english_level,
  exp_from,
  exp_to,
  keywords,
  location,
  page,
  ready_to_relocate,
  salary_max,
  salary_min,
  title,
}) => (
  <div className="fixed bottom-0 left-0 flex w-full items-center bg-white">
    <Sheet>
      <SheetTrigger asChild>
        <div className="border-borderColor flex w-full items-center border-t p-3">
          <Button variant="outline" className="w-full gap-2 text-lg font-semibold">
            <ListFilter className="h-4 w-4" />
            Фільтри
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-full">
        <SheetHeader>
          <SheetTitle>Are you sure absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  </div>
);

export default SheetDevelopers;
