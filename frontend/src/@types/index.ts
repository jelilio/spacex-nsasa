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

export type AssetItem = {
  href: string;
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

export interface Paged<T> {
  content: T[];
  meta: MetaFields;
  nextPage: number;
  previousPage: number;
}

export interface MetaFields {
  size: number;
  page: number;
  numberOfElements: number;
  totalPages: number;
  totalElements: number;
}

export type ImageAssetCollection = {
  version: string;
  href: string;
  items: AssetItem[];
};
