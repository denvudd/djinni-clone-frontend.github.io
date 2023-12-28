import React from 'react';
import Link from 'next/link';
import { getCandidateProfile } from '@/actions/private/get-candidate-profile';
import { formatEnglishLevel } from '@/lib/utils';

interface SidebarJobsByProfileProps {
  candidateId: string;
}

const SidebarJobsByProfile: React.FC<SidebarJobsByProfileProps> = async ({ candidateId }) => {
  const { category, expectations, experience, english, employmentOptions, hourlyRate } =
    await getCandidateProfile(candidateId);

  return (
    <aside className="border-borderColor col-span-2 rounded-md border">
      <div className="border-b-borderColor border-b border-dashed p-5 pt-4">
        <div className="mb-0">
          <div className="border-l-orange -mx-5 border-l-2 px-5">
            <div className="">
              <h4>За моїм профілем</h4>
              <ul className="text-gray inline-flex flex-wrap items-center gap-1 text-sm">
                {category && <li>{category},</li>}
                {expectations && <li>від ${expectations},</li>}
                {experience && <li>{experience} роки досвіду,</li>}
                {english && <li>{formatEnglishLevel(english).label},</li>}
                {employmentOptions && <li>{employmentOptions},</li>}
                {hourlyRate && <li>${hourlyRate}/год</li>}
              </ul>
              <Link href="/my/profile" className="text-link text-sm">
                Редагувати профіль
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 pt-4">
        <h4 className="text-sm font-medium">Підписки</h4>
        <ul className="mt-2 text-sm">
          <li className="text-gray">У вас поки що немає підписок</li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarJobsByProfile;
