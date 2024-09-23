import moment from "moment";
import { ConfigObject } from "../config";
import BaseService from "./BaseService";
import axios, { AxiosResponse } from "axios";

export type ApodProp = {
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  count?: number;
  thumbs?: boolean;
};

export type ApodObject = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

export type ApodError = {
  code: number;
  msg: string;
  service_version: string;
};

export default class ApodService extends BaseService {
  constructor(config: ConfigObject) {
    super({
      baseUrl: config.nasa.apiBaseUrl,
      endpoints: "/planetary/apod",
      apiKey: config.nasa.apiKey,
    });
  }

  async today(): Promise<AxiosResponse<ApodObject>> {
    var url = new URL(this.baseUrl);

    return await axios.get(url.toString());
  }

  async single({ date }: ApodProp): Promise<AxiosResponse<ApodObject>> {
    var url = new URL(this.baseUrl);

    date && url.searchParams.append("date", moment(date).format("YYYY-MM-DD"));

    return await axios.get(url.toString());
  }

  async dateRange({
    startDate,
    endDate,
  }: ApodProp): Promise<AxiosResponse<ApodObject[]>> {
    var url = new URL(this.baseUrl);

    startDate &&
      url.searchParams.append(
        "start_date",
        moment(startDate).format("YYYY-MM-DD")
      );
    endDate &&
      url.searchParams.append("end_date", moment(endDate).format("YYYY-MM-DD"));

    return await axios.get(url.toString());
  }

  async random({
    count,
    thumbs,
  }: ApodProp): Promise<AxiosResponse<ApodObject>> {
    var url = new URL(this.baseUrl);

    count && url.searchParams.append("count", count.toString());
    thumbs && url.searchParams.append("thumbs", thumbs.toString());

    return await axios.get(url.toString());
  }
}
