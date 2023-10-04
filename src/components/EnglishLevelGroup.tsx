import React from 'react';

import { FormControl, FormItem, FormLabel } from '@/components/ui/Form';
import { RadioGroupItem } from '@/components/ui/RadioGroup';

import { convertEnumObjToArray, formatEnglishLevel } from '@/lib/utils';
import { EnglishLevel } from '@/lib/enums';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/Tooltip';

const EnglishLevelGroup: React.FC = () =>
  convertEnumObjToArray(EnglishLevel).map((level) => (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem value={level} />
      </FormControl>
      <FormLabel className="text-base">
        {formatEnglishLevel(level).label}
        <Tooltip>
          <TooltipTrigger className="text-link ml-1">[?]</TooltipTrigger>
          <TooltipContent>{formatEnglishLevel(level).tooltip}</TooltipContent>
        </Tooltip>
      </FormLabel>
    </FormItem>
  ));

export default EnglishLevelGroup;
