import moment from "moment";
import { ConfigObject } from "../config";
import BaseService from "./BaseService";

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

export default class ApodService extends BaseService {
  constructor(config: ConfigObject) {
    super(config, "planetary/apod");
  }

  async fetchApod({
    date,
    startDate,
    endDate,
    count,
    thumbs,
  }: ApodProp): Promise<ApodObject> {
    var url = new URL(this.baseUrl);

    date && url.searchParams.append("date", moment(date).format("YYYY-MM-DD"));
    startDate &&
      url.searchParams.append(
        "start_date",
        moment(startDate).format("YYYY-MM-DD")
      );
    endDate &&
      url.searchParams.append("end_date", moment(endDate).format("YYYY-MM-DD"));
    count && url.searchParams.append("count", count.toString());
    thumbs && url.searchParams.append("thumbs", thumbs.toString());

    const response = await fetch(url.toString(), { method: "GET" });

    return (await response.json()) as Promise<ApodObject>;
  }
}
