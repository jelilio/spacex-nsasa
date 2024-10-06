import { useQuery } from '@tanstack/react-query';
import { getApodTodayOrSingle } from './apod';
import { format } from 'date-fns';

const QUERY_KEY_ASSET = 'apod-today';

function getKey(date: Date | null): string[] {
  return date
    ? [QUERY_KEY_ASSET, format(date, 'yyyy-MM-dd')]
    : [QUERY_KEY_ASSET];
}

export function useGetApodToday(date: Date | null) {
  const queryResult = useQuery({
    queryKey: getKey(date),
    queryFn: () => getApodTodayOrSingle(date),
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
