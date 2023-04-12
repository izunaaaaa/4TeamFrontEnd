import { BASE_URL } from "api/URL/BaseURL";
import axios from "axios";
import { Letterlists } from "interface/Interface";

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getFeeds = async (url: string) =>
  await instance.get(url).then((res) => {
    return res.data;
  });

export const getLetterlists = (): Promise<Letterlists[]> => {
  return instance.get(`letterlists/`).then((res) => res.data);
};
