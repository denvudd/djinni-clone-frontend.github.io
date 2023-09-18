import React from 'react';

import { getAuthServerSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';

interface EmployerHomeLayoutProps {
  children: React.ReactNode;
}

const EmployerHomeLayout: React.FC<EmployerHomeLayoutProps> = async ({
  children,
}) => {
  const session = await getAuthServerSession();

  if (!session || !session.user?.employer_id) redirect('/');

  if (session.user.role !== 'Employer') redirect('/');

  return <>{children}</>;
};

export default EmployerHomeLayout;
