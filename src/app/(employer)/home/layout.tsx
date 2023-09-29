import React from 'react';

import { redirect } from 'next/navigation';
import { getAuthServerSession } from '@/lib/next-auth';
import { UserRole } from '@/lib/enums';

interface EmployerHomeLayoutProps {
  children: JSX.Element; // not React.ReactNode because of https://github.com/vercel/next.js/issues/49280
}

const EmployerHomeLayout: React.FC<EmployerHomeLayoutProps> = async ({ children }) => {
  const session = await getAuthServerSession();

  if (!session?.user?.employer_id) redirect('/');

  if (session.user.role !== UserRole.Employer) redirect('/');

  return children;
};

export default EmployerHomeLayout;
