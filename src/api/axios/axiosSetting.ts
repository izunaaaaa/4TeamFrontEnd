import { BASE_URL } from "api/URL/BaseURL";
import axios from "axios";
import { queryErrorHandler } from "index";

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getFeeds = async (url: string) =>
  await instance.get(url).then((res) => {
    return res.data;
  });
