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

  if (!session || !session.user?.employer_id) redirect('/');

  if (session.user.role !== 'Employer') redirect('/');

  return (
    <>
      <Navbar isUserFilled={session.user.filled} />
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default CandidateLayout;
