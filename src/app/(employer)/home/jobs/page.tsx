import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { getEmployerVacancies } from '@/actions/get-employer-vacancies';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { buttonVariants } from '@/components/ui/Button';
import { getAuthServerSession } from '@/lib/next-auth';
import { cn } from '@/lib/utils';

const Page: React.FC = async () => {
  const session = await getAuthServerSession();

  if (!session?.user.employer_id) redirect('/');

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
              <strong className="text-white">Опублікуйте першу вакансію. </strong>
              Ми надішлемо її підходящим кандидатам. В середньому, ви отримаєте від 15 відгуків.
            </p>
          </AlertDescription>
        </Alert>
      )}
      <Link href="/home/post_job" className={cn(buttonVariants({ className: 'text-base mb-6' }))}>
        Створити нову вакансію
      </Link>

      {vacancies && !!vacancies.length && (
        <ul className="flex flex-col gap-8">
          {vacancies.map((vacancy) => (
            <li className="max-w-xl w-full">
              <h4 className="text-lg">
                <Link className="text-link" href={`/jobs/${vacancy.id}`}>
                  {vacancy.name}
                </Link>{' '}
                {vacancy.active ? (
                  <span className="text-green">(активна)</span>
                ) : (
                  <span className="text-danger">(неактивна)</span>
                )}
              </h4>
              <div className="flex gap-2 text-sm mt-1">
                <Link className="text-link" href={`/home/post_job?job=${vacancy.id}`}>
                  Редагувати
                </Link>
                <span className="text-sm text-gray">·</span>
                <span className="text-gray">
                  {vacancy.responsesCount ? vacancy.responsesCount : 'Немає відгуків'}
                </span>
                <span className="text-sm text-gray">·</span>
                <Link
                  className="text-link"
                  href={`/developers?title=${vacancy.category}&exp_from=${vacancy.experience}&english_level=${vacancy.english}&salary_min=${vacancy.privateSalaryForkGte}&salary_max=${vacancy.privateSalaryForkLte}&employment_options=${vacancy.employmentOptions}&location=${vacancy.city}`}
                >
                  Кандидати
                </Link>
                <span className="text-sm text-gray">·</span>
                <Link className="text-danger" href={`/home/post_job?delete=${vacancy.id}`}>
                  Видалити
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {vacancies && !vacancies.length && <p>У вас поки що немає активних вакансій.</p>}
      <Link href="/jobs" className="text-link mt-7 inline-block">
        Вакансії інших роботодавців
      </Link>
    </>
  );
};

export default Page;
