import Link from 'next/link';
import React from 'react';

import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const Page: React.FC = ({}) => {
  return (
    <div className="space-y-4">
      <div className="leading-6 text-xl mb-4">
        <p>Ласкаво просимо на Джин! 👋</p>
        <p className="mt-6">
          Джин – спеціалізований сервіс для пошуку роботи в українському ІТ і
          ремоут.
        </p>
      </div>
      <Link
        href="/my/wizard/step2"
        className={cn(
          buttonVariants({
            variant: 'default',
            className: 'text-lg py-5 px-5',
          }),
        )}
      >
        Поїхали!
      </Link>
    </div>
  );
};

export default Page;
