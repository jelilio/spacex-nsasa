import { useQuery } from '@tanstack/react-query';
import { getAsset } from './images';

const QUERY_KEY_ASSET = 'asset';

export function useGetAsset({ nasaId }: { nasaId: string }) {
  const queryResult = useQuery({
    queryKey: [QUERY_KEY_ASSET, nasaId],
    queryFn: () => getAsset({ nasaId }),
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
