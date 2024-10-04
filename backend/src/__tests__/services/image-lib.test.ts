import moment from "moment";
import { getImageLibService } from "../../services/service-injection";

describe("getSearchApi", () => {
  it("should return a value", async () => {
    let imageLibService = getImageLibService();
    let res = await imageLibService.getSearchApi({
      q: "apollo",
      size: 1,
      page: 1,
    });

    expect(res).toBeTruthy();
  });
});

describe("getAssetApi", () => {
  it("should return a value", async () => {
    let imageLibService = getImageLibService();
    let res = await imageLibService.getAssetApi("123456");

    expect(res).toBeTruthy();
  });
});
