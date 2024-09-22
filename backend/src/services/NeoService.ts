import { ConfigObject } from "../config";
import BaseService from "./BaseService";

export type BrowseProp = {
  date?: Date;
  startDate?: Date;
  endDate?: Date;
  count?: number;
  thumbs?: boolean;
};

export default class NeoService extends BaseService {
  constructor(config: ConfigObject) {
    super({
      baseUrl: config.nasa.apiBaseUrl,
      endpoints: "/planetary/apod",
      apiKey: config.nasa.apiKey,
    });
  }

  async neoBrowse() {}
}
