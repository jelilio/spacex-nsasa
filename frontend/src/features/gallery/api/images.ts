import { AxiosResponse } from 'axios';
import axios from '../../../utils/axios';
import { Paged, ImageItem } from '../../../@types';

const ENDPOINT = '/imagelib';

export async function getImages({
  page,
  size,
  query,
  mediaTypes,
}: {
  page: number;
  size: number;
  query: string;
  mediaTypes: string[];
}): Promise<Paged<ImageItem>> {
  const { data }: AxiosResponse<Paged<ImageItem>> = await axios.get(ENDPOINT, {
    params: {
      page,
      size,
      q: query,
      mediaType: mediaTypes.join(','),
    },
  });

  return data;
}
