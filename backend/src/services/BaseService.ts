import { ConfigObject } from "../config";

export default class BaseService {
  config: ConfigObject;
  baseUrl: string;

  constructor(config: ConfigObject, endpoints: string) {
    this.config = config;
    this.baseUrl = `${config.nasa.apiBaseUrl}/${endpoints}?api_key=${config.nasa.apiKey}`;
  }
}
