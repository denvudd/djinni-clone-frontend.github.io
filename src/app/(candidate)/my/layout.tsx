import React from 'react';

import { getAuthServerSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';

interface CandidateMyLayoutProps {
  children: React.ReactNode;
}

const CandidateMyLayout: React.FC<CandidateMyLayoutProps> = async ({
  children,
}) => {
  const session = await getAuthServerSession();

  if (!session || !session.user?.candidate_id) redirect('/');

  if (session.user.role !== 'Candidate') redirect('/');

  return <>{children}</>;
};

export default CandidateMyLayout;
