import React from 'react';

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import ArchiveEmployerButton from './ArchiveEmployerButton';
import FavoriteEmployerButton from './FavoriteEmployerButton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';

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
  <div className="bg-background absolute right-5 top-5 z-10 hidden rounded-md p-1 shadow-[0_0_8px_0_rgba(0,0,0,.04),_0_0_0_1px_rgba(0,0,0,.04)] group-hover:block">
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
                }),
              )}
              href={`/home/inbox/${offerId}#reply`}
            >
              <MessageCircle className="text-gray h-5 w-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>Відповісти</TooltipContent>
        </Tooltip>
      </li>
    </ul>
  </div>
);

export default OfferPanel;
