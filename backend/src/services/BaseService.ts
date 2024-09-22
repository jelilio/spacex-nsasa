import { ConfigObject } from "../config";

export type BaseProps = {
  baseUrl: string;
  apiKey?: string;
  endpoints: string;
};

export default class BaseService {
  baseUrl: string;

  constructor({ baseUrl, apiKey, endpoints }: BaseProps) {
    this.baseUrl = apiKey
      ? `${baseUrl}${endpoints}?api_key=${apiKey}`
      : `${baseUrl}${endpoints}`;
  }
}
