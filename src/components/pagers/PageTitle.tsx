import React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps extends React.ButtonHTMLAttributes<HTMLHeadingElement> {
  children: string | React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className, ...props }) => (
  <h1 className={cn('mb-4 text-3xl font-semibold', className)} {...props}>
    {children}
  </h1>
);

export default PageTitle;
