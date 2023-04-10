import { BASE_URL } from "api/URL/BaseURL";
import axios from "axios";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export const getFeeds = () => {
  instance.get("/feeds");
};
