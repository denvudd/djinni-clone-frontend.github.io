import React from 'react';

import { redirect } from 'next/navigation';
import { getAuthServerSession } from '@/lib/next-auth';

import CandidateWizardStep2 from '@/components/forms/wizard/CandidateWizardStep2';
import { Progress } from '@/components/ui/Progress';

const Page: React.FC = async () => {
  const session = await getAuthServerSession();

  if (!session?.user.candidate_id) redirect('/');

  return (
    <div className="md:max-w-[60%] md:flex-[0_0_60%]">
      <p>33% Заповнено</p>
      <Progress value={33} className="mt-1" />
      <CandidateWizardStep2 candidateId={session.user.candidate_id} />
    </div>
  );
};

export default Page;
