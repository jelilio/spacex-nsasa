import request from "supertest";
import webApp from "../../app";

import config from "../../config";
import { Application } from "express";

let server: Application;

beforeAll(async () => {
  server = webApp(config);
});

describe("getTodayRoute", () => {
  it("should return a value", async () => {
    const res = await request(server)
      .get(`/api/apod/today`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.copyright).toBe("copyright0");
  });
});

describe("getSingleRoute", () => {
  it("should return a value", async () => {
    const res = await request(server)
      .get(`/api/apod/single?date=2023-12-12`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.date).toBe("2023-12-12");
  });
});
