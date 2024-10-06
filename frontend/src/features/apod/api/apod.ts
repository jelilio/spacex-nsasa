import { AxiosResponse } from 'axios';
import axios from '../../../utils/axios';
import { ApodObject } from '../../../@types';
import { format } from 'date-fns';

const ENDPOINT = '/apod/today';
const SINGLE_ENDPOINT = '/apod/single';

export async function getApodToday(): Promise<ApodObject> {
  const { data }: AxiosResponse<ApodObject> = await axios.get(ENDPOINT);

  return data;
}

export async function getApodSingle(date: Date): Promise<ApodObject> {
  const { data }: AxiosResponse<ApodObject> = await axios.get(
    `${SINGLE_ENDPOINT}?date=${format(date, 'yyyy-MM-dd')}`,
  );

  return data;
}

export async function getApodTodayOrSingle(
  date: Date | null,
): Promise<ApodObject> {
  return date ? getApodSingle(date) : getApodToday();
}
