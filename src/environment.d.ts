declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      REACT_APP_NCP_serviceID: string;
      NCP_accessKey: string;
      NCP_secretKey: string;
      REACT_APP_API_KEY: number;
      NODE_ENV: "development" | "production";
    }
  }
}

declare module "*.png";

export {};
