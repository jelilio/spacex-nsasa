import { useQuery } from '@tanstack/react-query';
import { getApodToday } from './apod';

const QUERY_KEY_ASSET = 'apod-today';

export function useGetApodToday() {
  const queryResult = useQuery({
    queryKey: [QUERY_KEY_ASSET],
    queryFn: () => getApodToday(),
  });

  return {
    data: queryResult.data,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
    isFetched: queryResult.isFetched,
    isFetching: queryResult.isFetching,
    refetch: async () => {
      await queryResult.refetch();
    },
  };
}
