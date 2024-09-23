import axios, { AxiosResponse } from "axios";
import { ConfigObject } from "../config";
import BaseService from "./BaseService";

export type ImageLibProp = {
  q?: string;
  mediaType?: string;
  page: number;
  size: number;
};

export type ImageLibObject = {
  collection: ImageLibCollection;
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

export default class ImageLibService extends BaseService {
  constructor(config: ConfigObject) {
    super({
      baseUrl: config.nasa.apiImageBaseUrl,
      endpoints: "",
    });
  }

  async search({
    q,
    page,
    size,
    mediaType,
  }: ImageLibProp): Promise<AxiosResponse<ImageLibObject>> {
    var url = new URL(`${this.baseUrl}/search`);

    q && url.searchParams.append("q", q);
    size && url.searchParams.append("page_size", size.toString());
    page && url.searchParams.append("page", page.toString());
    mediaType && url.searchParams.append("media_type", mediaType);

    const response = await fetch(url.toString(), { method: "GET" });

    return await axios.get(url.toString());
  }
}
