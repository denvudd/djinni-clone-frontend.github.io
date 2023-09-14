import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { getAuthServerSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';

interface CandidateLayoutProps {
  children: React.ReactNode;
}

const CandidateLayout: React.FC<CandidateLayoutProps> = async ({
  children,
}) => {
  const session = await getAuthServerSession();

  if (!session || !session.user?.candidate_id) redirect('/');

  if (session.user.role !== 'Candidate') redirect('/');

  return (
    <>
      <Navbar />
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default CandidateLayout;
