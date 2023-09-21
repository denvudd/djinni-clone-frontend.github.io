import * as React from 'react';
import Link from 'next/link';
import { SlashIcon } from '@radix-ui/react-icons';

import { cn, truncate } from '@/lib/utils';
import { IconProps } from '@radix-ui/react-icons/dist/types';

interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<'nav'> {
  segments: {
    title: string;
    href: string;
  }[];
  separator?:
    | React.ComponentType<{ className?: string }>
    | React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >;
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
      className={cn(
        'flex w-full items-center overflow-auto text-primary',
        className,
      )}
      {...props}
    >
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1;

        return (
          <React.Fragment key={segment.href}>
            <Link
              aria-current={isLastSegment ? 'page' : undefined}
              href={segment.href}
              className={cn('truncate hover:text-foreground transition-colors')}
            >
              {truncationLength > 0 && segment.title
                ? truncate(segment.title, truncationLength)
                : segment.title}
            </Link>
            {!isLastSegment && (
              <SeparatorIcon className="mx-2 h-4 w-4" aria-hidden="true" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
