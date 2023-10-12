import React from 'react';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { buttonVariants } from '@/components/ui/Button';
import ArchiveEmployerButton from './ArchiveEmployerButton';
import FavoriteEmployerButton from './FavoriteEmployerButton';

import { cn } from '@/lib/utils';

interface OfferPanelProps {
  offerId: string;
  employerId: string;
  candidateId: string;

  isFavorite?: boolean;
  isArchived?: boolean;
}

const OfferPanel: React.FC<OfferPanelProps> = ({
  candidateId,
  employerId,
  offerId,
  isArchived,
  isFavorite,
}) => (
  <div className="bg-background right-5 top-5 z-10 rounded-md p-1 sm:absolute sm:hidden sm:shadow-[0_0_8px_0_rgba(0,0,0,.04),_0_0_0_1px_rgba(0,0,0,.04)] sm:group-hover:block">
    <ul className="flex items-center">
      {!isArchived && (
        <li>
          <ArchiveEmployerButton
            candidateId={candidateId}
            employerId={employerId}
            offerId={offerId}
          />
        </li>
      )}
      {!isFavorite && (
        <li>
          <FavoriteEmployerButton
            candidateId={candidateId}
            employerId={employerId}
            offerId={offerId}
          />
        </li>
      )}
      <li>
        <Tooltip>
          <TooltipTrigger>
            <Link
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className: 'pl-0 sm:px-2 sm:py-4',
                }),
              )}
              href={`/home/inbox/${offerId}#reply`}
            >
              <MessageCircle className="text-gray h-6 w-6 sm:h-5 sm:w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>Відповісти</TooltipContent>
        </Tooltip>
      </li>
    </ul>
  </div>
);

export default OfferPanel;
