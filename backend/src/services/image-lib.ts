import axios, { AxiosResponse } from "axios";
import config, { ConfigObject } from "../config";
import BaseService from "./base";

export type ImageLibProp = {
  q?: string;
  mediaType?: string;
  page: number;
  size: number;
};

export type ImageLibObject = {
  collection: ImageLibCollection;
};

export type ImageAssetObject = {
  collection: ImageAssetCollection;
};

export type ImageAssetCollection = {
  version: string;
  href: string;
  items: AssetItem[];
};

export type AssetItem = {
  href: string;
};

export type ImageLibCollection = {
  version: string;
  href: string;
  items: ImageItem[];
  metadata: Metadata;
};

export type ImageItem = {
  href: string;
  data: ImageItemData[];
  links: Link[];
};

export type ImageItemData = {
  album: string[];
  center: string;
  title: string;
  photographer: string;
  keywords: string[];
  location: string;
  nasa_id: string;
  media_type: string;
  date_created: string;
  description: string;
};

export type Link = {
  href: string;
  rel: string;
  prompt: string;
  notfound: string;
};

export interface Metadata {
  total_hits: number;
}

const ENDPOINT = "";

export interface ImageLibService {
  getSearchApi: ({
    q,
    page,
    size,
    mediaType,
  }: ImageLibProp) => Promise<ImageLibObject>;
  getAssetApi: (nasaId: string) => Promise<ImageAssetObject>;
}

class ImageLibServiceImpl extends BaseService implements ImageLibService {
  constructor() {
    super({
      baseUrl: config.nasa.apiImageBaseUrl,
      endpoints: ENDPOINT,
    });
  }

  async getSearchApi({
    q,
    page,
    size,
    mediaType,
  }: ImageLibProp): Promise<ImageLibObject> {
    var url = new URL(`${this.baseUrl}/search`);

    q && url.searchParams.append("q", q);
    size && url.searchParams.append("page_size", size.toString());
    page && url.searchParams.append("page", page.toString());
    mediaType && url.searchParams.append("media_type", mediaType);

    return await this.fetchData<ImageLibObject>(url);
  }

  async getAssetApi(nasaId: string): Promise<ImageAssetObject> {
    var url = new URL(`${this.baseUrl}/asset/`);

    url.pathname = nasaId && url.pathname.concat(nasaId);

    return await this.fetchData<ImageAssetObject>(url);
  }
}

export default ImageLibServiceImpl;
