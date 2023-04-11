import { BASE_URL } from "api/URL/BaseURL";
import axios from "axios";

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getFeeds = () => instance.get("/feeds/").then((res) => res.data);
import { BASE_URL } from "api/URL/BaseURL";
