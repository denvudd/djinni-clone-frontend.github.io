import { getEmployerVacancies } from '@/actions/get-employer-vacancies';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { buttonVariants } from '@/components/ui/Button';
import { getAuthServerSession } from '@/lib/next-auth';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const Page: React.FC = async () => {
  const session = await getAuthServerSession();

  if (!session || !session.user.employer_id) redirect('/');

  const vacancies = await getEmployerVacancies(session.user.employer_id);

  return (
    <>
      <h1 className="text-3xl leading-5 font-semibold mb-4">Мої вакансії</h1>
      {vacancies && !vacancies.length && (
        <Alert className="bg-brand p-3 flex items-center gap-2 mb-8">
          <div className="animate-bounce">
            <Image
              src="https://djinni.co/static/images/icons/emoji_point_down.png"
              width={24}
              height={24}
              alt="Hint emoji"
            />
          </div>
          <AlertDescription>
            <p className="text-sm text-gray-400">
              <strong className="text-white">
                Опублікуйте першу вакансію.{' '}
              </strong>
              Ми надішлемо її підходящим кандидатам. В середньому, ви отримаєте
              від 15 відгуків.
            </p>
          </AlertDescription>
        </Alert>
      )}
      <Link
        href="/home/post_job"
        className={cn(buttonVariants({ className: 'text-base mb-6' }))}
      >
        Створити нову вакансію
      </Link>
      {vacancies && !vacancies.length && (
        <p>У вас поки що немає активних вакансій.</p>
      )}
      <Link href="/jobs" className="text-link mt-7 inline-block">
        Вакансії інших роботодавців
      </Link>
    </>
  );
};

export default Page;
