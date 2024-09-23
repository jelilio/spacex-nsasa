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

export type ApodQueryParam = {
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  count?: number;
  thumbs?: boolean;
};
