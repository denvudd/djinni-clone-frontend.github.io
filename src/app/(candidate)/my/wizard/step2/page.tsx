import React from 'react';

import CandidateWizardStep1 from '@/components/forms/wizard/CandidateWizardStep1';
import { Progress } from '@/components/ui/Progress';

const Page: React.FC = ({}) => {
  return (
    <div className="flex flex-col">
      <div className="flex-[0_0_60%] max-w-[60%]">
        <p>0% Заповнено</p>
        <Progress value={0} className="mt-1" />
        <CandidateWizardStep1 />
      </div>
    </div>
  );
};

export default Page;
