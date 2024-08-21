import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, medcore_endpoints } from 'src/utils/axios';

// -------------------------------------

export const useGetPractitioners = () => {
  const URL = medcore_endpoints.practitioner.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      practitioners: data?.entry,
      practitionersLoading: isLoading,
      practitionersError: error,
      practitionersValidating: isValidating,
      pagination: data?.link,
    }),
    [data?.entry, data?.link, error, isLoading, isValidating]
  );

  return memoizedValue;
};
