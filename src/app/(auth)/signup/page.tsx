import React from 'react';
import { Metadata } from 'next';
import SignUpForm from '@/components/forms/SignUpForm';

const Page: React.FC = () => <SignUpForm />;

export default Page;

export const metadata: Metadata = {
  title: 'Реєстрація',
};
