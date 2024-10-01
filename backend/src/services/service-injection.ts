import ApodServiceImpl, { ApodService, FakeApodServiceImpl } from "./apod";
import ImageLibServiceImpl, { ImageLibService } from "./image-lib";

export function getApodService(): ApodService {
  return process.env.NODE_ENV === "test"
    ? new FakeApodServiceImpl()
    : new ApodServiceImpl();
}

export function getImageLibService(): ImageLibService {
  return new ImageLibServiceImpl();
}
