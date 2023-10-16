import axios, { AxiosError } from 'axios';
import { type Session } from 'next-auth';
import { type EmployerSubscribe } from '@/types';
import { UserRole } from '@/lib/enums';

export async function getEmployerSubscriptions(session: Session | null) {
  if (!session) return undefined;
  if (session.user.role !== UserRole.Employer) {
    return undefined;
  }

  const { data } = await axios.get(
    process.env.NEXT_PUBLIC_BACKEND_API_URL +
      `/employer/${session?.user?.employer_id}/subscriptions`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    },
  );

  if (data instanceof AxiosError) throw new Error();

  return data as EmployerSubscribe[];
}
