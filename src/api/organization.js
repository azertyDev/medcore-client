import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, medcore_endpoints } from 'src/utils/axios';

// -------------------------------------

export const useGetOrganizations = () => {
  const URL = medcore_endpoints.organization.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      organizations: data?.entry,
      organizationsLoading: isLoading,
      organizationsError: error,
      organizationsValidating: isValidating,
      pagination: data?.link,
    }),
    [data?.entry, data?.link, error, isLoading, isValidating]
  );

  return memoizedValue;
};
