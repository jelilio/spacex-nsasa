import dotenv from "dotenv";

dotenv.config();

export type ConfigObject = {
  name: string;
  logger: {
    level: string;
  };
  nasa: {
    apiKey: string;
    apiBaseUrl: string;
    apiImageBaseUrl: string;
  };
};

const config: Record<"development" | "production", ConfigObject> = {
  development: {
    name: `${process.env.APP_NAME} [Devlopment]`,
    logger: {
      level: "info",
    },
    nasa: {
      apiKey: process.env.DEV_NASA_API_KEY as string,
      apiBaseUrl: process.env.DEV_NASA_API_URL as string,
      apiImageBaseUrl: process.env.DEV_NASA_IMAGES_API_URL as string,
    },
  },
  production: {
    name: `${process.env.APP_NAME}`,
    logger: {
      level: "error",
    },
    nasa: {
      apiKey: process.env.PROD_NASA_API_KEY as string,
      apiBaseUrl: process.env.PROD_NASA_API_URL as string,
      apiImageBaseUrl: process.env.PROD_NASA_IMAGES_API_URL as string,
    },
  },
};

const environment = process.env.NODE_ENV as "development" | "production";

export default config[environment || "development"];
