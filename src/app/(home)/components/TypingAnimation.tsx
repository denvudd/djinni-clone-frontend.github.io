'use client';

import React from 'react';
import { useIsComponentMounted } from '@/hooks/use-is-component-mounted';
import Typewriter from 'typewriter-effect';

const TypingAnimation = () => {
  const { isMounted } = useIsComponentMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <Typewriter
      options={{
        strings: [
          'Для UX/UI дизайнерів.',
          'Для тестувальників.',
          'Для DevOps.',
          'Для UX/UI дизайнерів.',
          'Для всіх, хто працює в ІТ.',
          'Для програмістів.',
        ],
        autoStart: true,
        loop: true,
      }}
    />
  );
};

export default TypingAnimation;
