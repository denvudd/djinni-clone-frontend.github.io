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

const PageTabs: React.FC<PageTabsProps> = ({
  tabs,
  active,
  className,
  ...props
}) => {
  return (
    <ul
      className={cn(
        `flex relative gap-4 mb-5 flex-wrap before:absolute before:h-[2px] before:left-0 before:bottom-0 
      before:border-b before:border-b-borderColor before:w-full`,
        className,
      )}
      {...props}
    >
      {tabs.map((tab, index) => (
        <li>
          <Link
            href={tab.path}
            className={cn(
              'text-gray relative border-b-2 border-b-transparent font-semibold py-2 h-full block',
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
};

export default PageTabs;
