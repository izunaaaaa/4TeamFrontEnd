import { BASE_URL } from "api/URL/BaseURL";
import axios from "axios";
import { Letterlists } from "interface/Interface";

export const instance = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   "X-CSRFToken": Cookie.get("csrftoken") || "",
  // },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  withCredentials: true,
});

export const getFeeds = async (url: string) =>
  await instance.get(url).then((res) => {
    return res.data;
  });

export const getLetterlists = (): Promise<Letterlists[]> => {
  return instance.get(`letterlists/`).then((res) => res.data);
};
export const getFeedDetail = async (feedID: number, group: string) =>
  await instance.get(`${BASE_URL}/feeds/${group}/${feedID}/`).then((res) => {
    return res.data;
  });

export const login = async () => {
  // await instance.post().then(res => )
};

export const postCategory = async (name: string, group: string) =>
  await instance.post(`/categories/${group}`, { name }).then((res) => {
    return res.data;
  });

export const deleteCategory = async (group: string, id: number) =>
  await instance.delete(`/categories/${group}/${id}`).then((res) => {
    return res.data;
  });




