'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import qs from 'query-string';

import { Trash } from 'lucide-react';
import { Button } from './ui/Button';
import ErrorAlert from './ui/ErrorAlert';

import axios from '@/lib/axios';
import { formatEmploymenOptions, formatEnglishLevel } from '@/lib/utils';
import { EmployerSubscribe } from '@/types';

interface EmployerSubscriptionsListProps {
  employerId: string;
  subscriptions: EmployerSubscribe[] | undefined;
}

const EmployerSubscriptionsList: React.FC<EmployerSubscriptionsListProps> = ({
  employerId,
  subscriptions,
}) => {
  const router = useRouter();

  const {
    mutate: deleteSubscribe,
    isLoading: isSubscribeLoading,
    isError: isSubscribeError,
  } = useMutation({
    mutationFn: async (subscribeId: string) => {
      const { data } = await axios.delete(`/employer/${employerId}/subscribe/${subscribeId}`);

      if (data instanceof AxiosError) {
        throw new Error();
      }

      return data as {
        success: boolean;
        deletedCount: number;
      };
    },
    onSuccess: () => {
      router.push('/home/searches?subscription_deleted=ok');
      router.refresh();
    },
  });

  const onDelete = React.useCallback(
    (subscribeId: string) => () => deleteSubscribe(subscribeId),
    [subscriptions, deleteSubscribe],
  );

  const subscriptionList = !!subscriptions?.length
    ? React.useMemo(
        () =>
          subscriptions.map(
            ({
              category,
              employmentOptions,
              english,
              experience,
              id,
              keywords,
              locate,
              salaryForkGte,
              salaryForkLte,
            }) => {
              const elementsToRender = [
                category && `${category}`,
                employmentOptions && formatEmploymenOptions(employmentOptions),
                locate && `${locate}`,
                experience && `${experience}y`,
                english && formatEnglishLevel(english).label,
                salaryForkGte && `від $${salaryForkGte}`,
                salaryForkLte && `до $${salaryForkLte}`,
                keywords && `${keywords}`,
              ].filter((e) => Boolean(e));

              return (
                <li
                  key={id}
                  className="text-primary border-borderColor flex items-baseline justify-between gap-4 rounded-md border p-2"
                >
                  <Link
                    href={qs.stringifyUrl({
                      url: '/developers',
                      query: {
                        title: category ?? undefined,
                        exp_from: experience ?? undefined,
                        english_level: english ?? undefined,
                        employment_options: employmentOptions ?? undefined,
                        location: locate ?? undefined,
                        salary_min: salaryForkGte ?? undefined,
                        salary_max: salaryForkLte ?? undefined,
                        keywords: keywords ?? undefined,
                      },
                    })}
                  >
                    {elementsToRender.join(', ')}
                  </Link>
                  <Button
                    onClick={onDelete(id)}
                    size="icon"
                    variant="outline"
                    disabled={isSubscribeLoading}
                    className="px-2 sm:px-0"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </li>
              );
            },
          ),
        [subscriptions, deleteSubscribe, isSubscribeError, isSubscribeLoading],
      )
    : null;

  return (
    <ul className="flex flex-col gap-2">
      {isSubscribeError && <ErrorAlert />}
      {!subscriptionList?.length && <ErrorAlert />}
      {subscriptionList}
    </ul>
  );
};

export default EmployerSubscriptionsList;
