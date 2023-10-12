import * as React from 'react';
import Link from 'next/link';
import { SlashIcon } from '@radix-ui/react-icons';

import { IconProps } from '@radix-ui/react-icons/dist/types';
import { cn, truncate } from '@/lib/utils';

interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<'nav'> {
  segments: {
    title: string;
    href: string;
  }[];
  separator?:
    | React.ComponentType<{ className?: string }>
    | React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  truncationLength?: number;
}

export type BreadcrumbsSegment = BreadcrumbsProps['segments'];

export function Breadcrumbs({
  segments,
  separator,
  truncationLength = 0,
  className,
  ...props
}: BreadcrumbsProps) {
  const SeparatorIcon = separator ?? SlashIcon;

  return (
    <nav
      aria-label="breadcrumbs"
      className={cn('text-primary flex w-full flex-wrap items-center overflow-auto', className)}
      {...props}
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1;

        return (
          <React.Fragment key={segment.href}>
            <Link
              aria-current={isLastSegment ? 'page' : undefined}
              href={segment.href}
              className={cn('hover:text-foreground truncate transition-colors')}
            >
              {truncationLength > 0 && segment.title
                ? truncate(segment.title, truncationLength)
                : segment.title}
            </Link>
            {!isLastSegment && (
              <SeparatorIcon className="mx-1 h-4 w-4 sm:mx-2" aria-hidden="true" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
