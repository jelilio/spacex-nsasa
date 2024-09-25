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

export interface Paged<T> {
  content: T[];
  meta: MetaFields;
  nextPage?: number;
  previousPage?: number;
}

export interface MetaFields {
  size: number;
  page: number;
  numberOfElements: number;
  totalPages: number;
  totalElements: number;
}
