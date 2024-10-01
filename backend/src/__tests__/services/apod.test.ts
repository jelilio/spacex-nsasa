import moment from "moment";
import { getApodService } from "../../services/service-injection";

describe("getTodayApi", () => {
  it("should return a value", async () => {
    let apodService = getApodService();
    let res = await apodService.getTodayApi();

    expect(res.copyright).toEqual("copyright0");
  });
});

describe("getSingleApi", () => {
  it("should return a value", async () => {
    let apodService = getApodService();
    let todaysDate = new Date();
    let today = moment(todaysDate).format("YYYY-MM-DD");
    let res = await apodService.getSingleApi(todaysDate);

    expect(res.date).toEqual(today);
  });
});
