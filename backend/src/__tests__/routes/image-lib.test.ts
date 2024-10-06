import request from "supertest";
import webApp from "../../app";

import config from "../../config";
import { Application } from "express";

let server: Application;

beforeAll(async () => {
  server = webApp;
});

describe("getSearchRoute", () => {
  it("should return a value", async () => {
    const res = await request(server)
      .get(`/api/imagelib?q=hello&page=1&size=10`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("getImageAssetRoute", () => {
  it("should return a value", async () => {
    const res = await request(server)
      .get(`/api/imagelib/asset/12345678`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
