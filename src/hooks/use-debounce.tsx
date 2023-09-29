/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { useCallback } from 'react';
import debounce from 'lodash.debounce';

/**
 * A custom React hook wrapper based on the debounce function from lodash. 
 * Returns a memoized callback function that takes a callback and a delay value as parameters.
 * @see https://lodash.com/docs/4.17.15#debounce
 * @example
 * const debouncedSearch = useDebounce((value) => {
    console.log("Searching for:", value);
  }, 500);
 */

export const useDebounce = <T extends (...args: any[]) => any>(callback: T, delay: number) => {
  const debouncedCallback = useCallback(debounce(callback, delay), []);

  return debouncedCallback;
};
