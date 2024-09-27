import { useInfiniteQuery } from '@tanstack/react-query';
import { getImages } from './images';
import { ImageItem, Paged } from '../../../@types';

const QUERY_KEY = 'images';

export function getQueryKey(page: number) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page];
}

export function useGetImages({
  page,
  size,
  query,
  mediaTypes,
}: {
  page: number;
  size: number;
  query: string;
  mediaTypes: string[];
}) {
  const queryResult = useInfiniteQuery({
    initialPageParam: undefined,
    queryKey: [QUERY_KEY, page, query, mediaTypes.join(','), size],
    queryFn: ({ pageParam }) =>
      getImages({ page: pageParam || 1, size, query, mediaTypes }),

    getNextPageParam: (lastPage: Paged<ImageItem>) => {
      return lastPage?.nextPage;
    },

    getPreviousPageParam: (firstPage: Paged<ImageItem>) => {
      return firstPage?.previousPage;
    },
  });

  return {
    data: queryResult.data,
    isLoading: queryResult.isLoading,
    isError: queryResult.isError,
    error: queryResult.error,
    isFetched: queryResult.isFetched,
    isFetching: queryResult.isFetching,
    hasNextPage: queryResult.hasNextPage,
    isFetchingNextPage: queryResult.isFetchingNextPage,
    fetchNextPage: queryResult.fetchNextPage,
    refetch: async () => {
      await queryResult.refetch();
    },
  };
}
