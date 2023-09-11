import axios from 'axios';
import { getAuthServerSession } from './next-auth';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

instance.interceptors.request.use(async (config) => {
  const session = await getAuthServerSession();

  config.headers.Authorization = `Bearer ${session?.accessToken}`;

  return config;
});

export default instance;
