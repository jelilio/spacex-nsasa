import { ImageItem, Paged } from '../../@types';
import { useState } from 'react';
import GalleryItem from './GalleryItem';
import Button from '../../ui/Button';
import GallerySearch from './GallerySearch';
import { useGetImages } from './api/use-get-images';
import Spinner from '../../ui/Spinner';

const FIRST_PAGE = 1;
const PAGE_SIZE = 9;

export default function GalleryGrid() {
  const [size] = useState(PAGE_SIZE);
  const [page] = useState(FIRST_PAGE);
  const [query, setQuery] = useState('');
  const [mediaTypes, setMediaTypes] = useState<string[]>(['image']);

  const {
    isLoading,
    isError,
    isFetched,
    isFetching,
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetImages({ size, page, query, mediaTypes });

  const galleries: ImageItem[] =
    data?.pages?.flatMap((page: Paged<ImageItem>) => page?.content) || [];

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const handleMediaTypeChange = (name: string) => {
    setMediaTypes((current) => {
      let newState: string[] = [...current];

      if (newState.includes(name)) {
        newState = newState.filter((type) => type !== name);
      } else {
        newState.push(name);
      }

      return newState;
    });
  };

  let result;
  if (isLoading) {
    result = <Spinner />;
  } else if (isFetched) {
    result = (
      <>
        <div className="lg:gap-7.5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {galleries.map((it) => (
            <GalleryItem key={it.data[0].nasa_id} {...it} />
          ))}
        </div>
        <div className="lg:pt-7.5 flex grow justify-center pt-5">
          {galleries.length > 0 && (
            <Button
              onClick={() => fetchNextPage()}
              isLoading={isLoading || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
            </Button>
          )}
        </div>
      </>
    );
  } else if (isError) {
    result = <p>An error occured</p>;
  } else if (isFetching) {
    result = <p>Is fetching</p>;
  }

  return (
    <div>
      <GallerySearch
        query={query}
        mediaTypes={mediaTypes}
        setQuery={handleQueryChange}
        setMediaType={handleMediaTypeChange}
      />
      {result}
    </div>
  );
}
