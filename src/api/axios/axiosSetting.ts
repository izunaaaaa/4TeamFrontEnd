import { BASE_URL } from "api/URL/BaseURL";
import axios from "axios";
import { Letterlists, LoginData, SignUpData } from "interface/Interface";
import Cookie from "js-cookie";
export const instance = axios.create({
  // baseURL: BASE_URL,
  baseURL: "/api/v1/",
  headers: {
    "X-CSRFToken": Cookie.get("csrftoken") || "",
  },
  // withCredentials: true,
});

export const signUp = async (data: SignUpData) => {
  await instance.post(`/users/signup/`, data);
};

export const getGroup = async () =>
  await instance.get(`/groups/`).then((res) => {
    return res.data;
  });

export const login = async (data: LoginData) =>
  await instance.post(`/users/login/`, data).then((res) => {
    return res.data;
  });

/**Feed */
export const getFeeds = async (url: string) =>
  await instance.get(url).then((res) => {
    return res.data;
  });

export const getFeedDetail = async (
  groupPk: number,
  category: string,
  feedID: number
) =>
  await instance.get(`/feeds/${groupPk}/${category}/${feedID}`).then((res) => {
    return res.data;
  });

export const getFeedCategory = async (group: string) =>
  await instance.get(`/categories/${group}`).then((res) => res.data);

export const getLetterlists = (): Promise<Letterlists[]> => {
  return instance.get(`letterlists/`).then((res) => res.data);
};

export const postCategory = async (name: string, group: string) =>
  await instance.post(`/categories/${group}`, { name }).then((res) => {
    return res.data;
  });

export const deleteCategory = async (group: string, id: number) =>
  await instance.delete(`/categories/${group}/${id}`).then((res) => {
    return res.data;
  });
