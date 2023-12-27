import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { SalariesPageProps } from '@/app/(finances)/salaries/page';
import SalariesChart from './SalariesChart';
import { getSalariesStatistics } from '@/actions/server/get-salaries-statistics';
import { Button, buttonVariants } from '../ui/Button';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '../ui/Alert';

type SalariesStasticsProps = SalariesPageProps;

const SalariesStastics: React.FC<SalariesStasticsProps> = async ({ searchParams }) => {
  const { candidates, graphData, vacancies } = await getSalariesStatistics(searchParams);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-5">
        <div className="flex grow flex-col gap-2 rounded-md border border-gray-300 p-3">
          <Link href="/jobs" className="flex items-center gap-1.5 text-sm font-bold">
            Вакансії
            <ExternalLink className="text-link h-3.5 w-3.5" />
          </Link>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex grow flex-col">
              <span className="text-gray text-xs">Всього</span>
              <strong>{vacancies.count}</strong>
            </div>
            <div className="flex grow flex-col">
              <span className="text-gray text-xs">Мін. та макс.</span>
              <strong>
                ${!!vacancies.fork.min ? vacancies.fork.min : 0} - $
                {!!vacancies.fork.max ? vacancies.fork.max : 0}
              </strong>
            </div>
          </div>
        </div>

        <div className="flex grow flex-col gap-2 rounded-md border border-gray-300 p-3">
          <Link href="/developers" className="flex items-center gap-1.5 text-sm font-bold">
            Кандидати
            <ExternalLink className="text-link h-3.5 w-3.5" />
          </Link>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex grow flex-col">
              <span className="text-gray text-xs">Всього</span>
              <strong>{candidates.count}</strong>
            </div>
            <div className="flex grow flex-col">
              <span className="text-gray text-xs">Мін. та макс.</span>
              <strong>
                ${!!candidates.fork.min ? candidates.fork.min : 0} - $
                {candidates.fork.max ? candidates.fork.max : 0}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <SalariesChart graphData={graphData} />
        <div className="flex items-center gap-2">
          <span className="text-sm">Попит за останні</span>
          <span>
            <Link
              href={{
                pathname: '/salaries',
                query: {
                  ...searchParams,
                  period: undefined,
                },
              }}
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'rounded-ee-none rounded-se-none border border-gray-300',
              )}
            >
              6 місяців
            </Link>
            <Link
              href={{
                pathname: '/salaries',
                query: {
                  ...searchParams,
                  period: 'last30',
                },
              }}
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'sm' }),
                'rounded-es-none rounded-ss-none border border-gray-300',
                {
                  'font-bold border-gray-400': searchParams.period === 'last30',
                },
              )}
            >
              30 днів
            </Link>
          </span>
        </div>
      </div>

      <Alert className="bg-yellow-subtle">
        <AlertDescription className="flex items-center gap-3">
          <p className="flex-[1_0_0%] text-base">
            Раз на місяць Джин надсилає статистику за обраною спеціальністю та містом. Хто наймає,
            кого наймають та що відбувається із зарплатами.
          </p>
          <div className="">
            <Link href="/pulse" className={cn(buttonVariants(), 'inline-block')}>
              Дізнатися свою ціну...
            </Link>
          </div>
        </AlertDescription>
      </Alert>

      <Alert>
        <AlertDescription className="flex items-center gap-3">
          <p className="flex-[1_0_0%] text-base">
            Більше аналітики дивіться у нашому Телеграм каналі
          </p>
          <div className="">
            <Link
              href="/tg_djinni_official?src=salaries"
              className={cn(buttonVariants(), 'inline-block')}
            >
              Підписатись на канал
            </Link>
          </div>
        </AlertDescription>
      </Alert>

      <div className="">
        <h4 className="mb-2 font-bold">Як рахується статистика</h4>
        <div className="flex flex-col gap-4">
          <p>
            Ми рахуємо, скільки пропозицій отримав кожний кандидат та на яку зарплату. Наприклад,
            якщо Frontend-розробник у Києві із з/п $2500 отримав 10 пропозицій, то ми його порахуємо
            10 разів. Якщо пропозицій не було, то і до статистики він не потрапить.
          </p>
          <p>
            Стовпець графіку – це загальна кількість пропозицій. Це не кількість вакансій, але
            показник рівня попиту. Чим більше пропозицій, тим більше компаній намагаються найняти
            такого спеціаліста. 3k+ включає кандидатів із зарплатами {'>='} $3000 та {'<'} $3500.
          </p>
          <p>
            У верхніх блоках – статистика за поточними online вакансіями і online/passive
            кандидатами. Зарплатні очікування кандидатів – 25й та 75й персентилі. Зарплатні вилки
            вакансій – медіана нижніх і медіана верхніх вилок. Кількість пропозицій та відгуків -
            середнє на одну вакансію/кандидата <strong>серед поточних online/passive</strong>. У
            довгостроковому періоді числа будуть у 2-3 рази більше.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalariesStastics;
