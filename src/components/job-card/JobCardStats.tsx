'use client';

import React from 'react';

import { Eye, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/Tooltip';

interface JobCardStatsProps {
  views: number;
  responsesCount: number;
}

const JobCardStats: React.FC<JobCardStatsProps> = ({ responsesCount, views }) => (
  <div className="text-gray ml-2 inline-flex items-center gap-2">
    <Tooltip>
      <TooltipTrigger className="h-5 cursor-default">
        <span className="inline-flex items-center gap-1">
          <Eye className="h-4 w-4" />
          {views}
        </span>
        <TooltipContent>{views} переглядів</TooltipContent>
      </TooltipTrigger>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger className="h-5 cursor-default">
        <span className="inline-flex items-center gap-1">
          <Users className="h-4 w-4" />
          {responsesCount}
        </span>
        <TooltipContent>{responsesCount} відгуків</TooltipContent>
      </TooltipTrigger>
    </Tooltip>
  </div>
);

export default JobCardStats;
