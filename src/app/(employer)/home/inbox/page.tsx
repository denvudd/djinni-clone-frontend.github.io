import PageTabs, { PageTabProp } from '@/components/pagers/PageTabs';
import React from 'react';

interface PageProps {}

const Page: React.FC<PageProps> = ({}) => {
  const tabs: PageTabProp = [
    {
      title: 'Усі відгуки',
      path: '/home/inbox',
    },
    {
      title: 'Архів',
      path: '/home/inbox/archive',
    },
  ];

  return (
    <div className="-mt-8">
      <PageTabs tabs={tabs} active={0} />
    </div>
  );
};

export default Page;
