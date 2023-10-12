import React from 'react';

import { redirect } from 'next/navigation';
import { getAuthServerSession } from '@/lib/next-auth';

import CandidateWizardStep1 from '@/components/forms/wizard/CandidateWizardStep1';
import { Progress } from '@/components/ui/Progress';

const Page: React.FC = async () => {
  const session = await getAuthServerSession();

  if (!session?.user?.candidate_id) redirect('/');

  return (
    <div className="md:max-w-[60%] md:flex-[0_0_60%]">
      <p>0% Заповнено</p>
      <Progress value={0} className="mt-1" />
      <CandidateWizardStep1 candidateId={session.user.candidate_id} />
    </div>
  );
};

export default Page;
