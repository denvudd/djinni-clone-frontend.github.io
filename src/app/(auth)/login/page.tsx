'use client';

import React from 'react';
import { type Metadata } from 'next';
import SignInForm from '@/components/forms/SignInForm';

const Page: React.FC = () => <SignInForm />;

export default Page;

export const metadata: Metadata = {
  title: 'Вхід',
};
