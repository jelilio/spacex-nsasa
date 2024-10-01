import axios, { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/BadRequestError";

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

  async fetchData<T>(url: URL) {
    try {
      const result = await axios.get(url.toString());

      return result.data as T;
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        throw new BadRequestError({
          code: error.response?.status || StatusCodes.BAD_REQUEST,
          context: error.response?.data,
          logging: true,
        });
      } else {
        throw new Error("Ops! An error occured");
      }
    }
  }
}
