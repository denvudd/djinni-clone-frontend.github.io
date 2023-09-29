import React from 'react';

import { redirect } from 'next/navigation';
import { getAuthServerSession } from '@/lib/next-auth';

import CandidateWizardStep3 from '@/components/forms/wizard/CandidateWizardStep3';
import { Progress } from '@/components/ui/Progress';

const Page: React.FC = async () => {
  const session = await getAuthServerSession();

  if (!session?.user.candidate_id) redirect('/');

  return (
    <div className="flex flex-col">
      <div className="max-w-[60%] flex-[0_0_60%]">
        <p>66% Заповнено</p>
        <Progress value={66} className="mt-1" />
        <CandidateWizardStep3 candidateId={session.user.candidate_id} />
      </div>
    </div>
  );
};

export default Page;
