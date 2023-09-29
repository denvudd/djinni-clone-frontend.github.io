import React from 'react';

import { redirect } from 'next/navigation';
import { getAuthServerSession } from '@/lib/next-auth';
import { UserRole } from '@/lib/enums';

interface CandidateMyLayoutProps {
  children: JSX.Element; // not React.ReactNode because of https://github.com/vercel/next.js/issues/49280
}

const CandidateMyLayout: React.FC<CandidateMyLayoutProps> = async ({ children }) => {
  const session = await getAuthServerSession();

  if (!session?.user?.candidate_id) redirect('/');

  if (session.user.role !== UserRole.Candidate) redirect('/');

  return children;
};

export default CandidateMyLayout;
