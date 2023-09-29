import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

interface PageTabsProps extends React.ComponentPropsWithoutRef<'ul'> {
  tabs: {
    title: string;
    path: string;
  }[];
  active: number;
}

export type PageTabProp = PageTabsProps['tabs'];

const PageTabs: React.FC<PageTabsProps> = ({ tabs, active, className, ...props }) => (
  <ul
    className={cn(
      `before:border-b-borderColor relative mb-5 flex flex-wrap gap-4 before:absolute before:bottom-0 before:left-0 
      before:h-[2px] before:w-full before:border-b`,
      className,
    )}
    {...props}
  >
    {tabs.map((tab, index) => (
      <li>
        <Link
          href={tab.path}
          className={cn(
            'text-gray relative block h-full border-b-2 border-b-transparent py-2 font-semibold',
            {
              'text-gray-dark border-b-orange': active === index,
            },
          )}
        >
          {tab.title}
        </Link>
      </li>
    ))}
  </ul>
);

export default PageTabs;
