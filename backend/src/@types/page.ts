export type PageParam = {
  page: number;
  size: number;
};

export type SearchParam = {
  q: string;
} & PageParam;

export type ImageSearchParam = {
  mediaType: string;
} & SearchParam;
