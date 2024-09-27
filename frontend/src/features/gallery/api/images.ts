import { AxiosResponse } from 'axios';
import axios from '../../../utils/axios';
import { Paged, ImageItem, ImageAssetCollection } from '../../../@types';

const ENDPOINT = '/imagelib';
const ASSET_ENDPOINT = '/imagelib/asset';

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

export async function getAsset({
  nasaId,
}: {
  nasaId: string;
}): Promise<ImageAssetCollection> {
  const { data }: AxiosResponse<ImageAssetCollection> = await axios.get(
    `${ASSET_ENDPOINT}/${nasaId}`,
  );

  return data;
}
