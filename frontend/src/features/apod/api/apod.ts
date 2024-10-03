import { AxiosResponse } from 'axios';
import axios from '../../../utils/axios';
import { ApodObject } from '../../../@types';

const ENDPOINT = '/apod/today';
// const SINGLE_ENDPOINT = '/apod/single';

export async function getApodToday(): Promise<ApodObject> {
  const { data }: AxiosResponse<ApodObject> = await axios.get(ENDPOINT);

  return data;
}
