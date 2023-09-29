import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const getAuthServerSession = () => getServerSession(authOptions);
