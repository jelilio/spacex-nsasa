import config from "../config";
import moment from "moment";
import BaseService from "./base";
import { apod_list } from "../../data/apod";

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

export interface ApodService {
  getTodayApi: () => Promise<ApodObject>;
  getSingleApi: (date: Date) => Promise<ApodObject>;
  getDateRangeApi: (startDate: Date, endDate: Date) => Promise<ApodObject[]>;
  getRandomApi: (count: number, thumbs: boolean) => Promise<ApodObject>;
}

const ENDPOINT = "/planetary/apod";

class ApodServiceImpl extends BaseService implements ApodService {
  constructor() {
    super({
      baseUrl: config.nasa.apiBaseUrl,
      endpoints: ENDPOINT,
      apiKey: config.nasa.apiKey,
    });
  }

  async getTodayApi(): Promise<ApodObject> {
    var url = new URL(this.baseUrl);

    return this.fetchData<ApodObject>(url);
  }

  async getSingleApi(date: Date): Promise<ApodObject> {
    var url = new URL(this.baseUrl);

    date && url.searchParams.append("date", moment(date).format("YYYY-MM-DD"));

    return this.fetchData<ApodObject>(url);
  }

  async getDateRangeApi(startDate: Date, endDate: Date): Promise<ApodObject[]> {
    var url = new URL(this.baseUrl);

    startDate &&
      url.searchParams.append(
        "start_date",
        moment(startDate).format("YYYY-MM-DD")
      );
    endDate &&
      url.searchParams.append("end_date", moment(endDate).format("YYYY-MM-DD"));

    return this.fetchData<ApodObject[]>(url);
  }

  async getRandomApi(count: number, thumbs: boolean): Promise<ApodObject> {
    var url = new URL(this.baseUrl);

    count && url.searchParams.append("count", count.toString());
    thumbs && url.searchParams.append("thumbs", thumbs.toString());

    return this.fetchData<ApodObject>(url);
  }
}

export class FakeApodServiceImpl implements ApodService {
  async getTodayApi(): Promise<ApodObject> {
    return new Promise(function (resolve, reject) {
      return resolve(apod_list[0]);
    });
  }

  async getSingleApi(date: Date): Promise<ApodObject> {
    let today = date && moment(date).format("YYYY-MM-DD");
    let data = apod_list[0];
    data.date = today;

    return new Promise(function (resolve, reject) {
      return resolve(data);
    });
  }

  async getDateRangeApi(startDate: Date, endDate: Date): Promise<ApodObject[]> {
    return new Promise(function (resolve, reject) {
      return resolve(apod_list);
    });
  }

  async getRandomApi(count: number, thumbs: boolean): Promise<ApodObject> {
    return new Promise(function (resolve, reject) {
      return resolve(apod_list[0]);
    });
  }
}

export default ApodServiceImpl;
