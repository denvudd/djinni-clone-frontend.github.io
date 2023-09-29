/* eslint-disable no-param-reassign */

import axios from 'axios';
import { getSession } from 'next-auth/react';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
});

instance.interceptors.request.use(async (config) => {
  const session = await getSession();

  config.headers.Authorization = `Bearer ${session?.accessToken}`;

  return config;
});

export default instance;
