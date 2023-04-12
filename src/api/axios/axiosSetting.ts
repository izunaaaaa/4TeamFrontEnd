import { BASE_URL } from "api/URL/BaseURL";
import axios from "axios";

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getFeeds = async (url: string) =>
  await instance.get(url).then((res) => {
    return res.data;
  });

export const getFeedDetail = async (feedID: number, group: string) =>
  await instance.get(`${BASE_URL}/feeds/${group}/${feedID}/`).then((res) => {
    return res.data;
  });

export const login = async () => {
  // await instance.post().then(res => )
};
