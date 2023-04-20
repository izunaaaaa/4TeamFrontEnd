import { BASE_URL } from "api/URL/BaseURL";
import axios from "axios";
import { LoginData, SignUpData } from "interface/Interface";
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

export const postFeedLike = async (feedId: string) =>
  await instance.post(`/users/me/feedlike/`, feedId).then((res) => res.data);

export const getFeedDetail = async (feedId: number) =>
  await instance.get(`/feeds/${feedId}/`).then((res) => {
    return res.data;
  });

/**feed post form */
export const getFeedCategory = async (group: string) =>
  await instance.get(`/categories/${group}`).then((res) => res.data);

export const postUploadUrl = async (imgFile: File) =>
  await instance.post(`/media/uploadURL`).then((res) => {
    const url = res.data.uploadURL;
    const form = new FormData();

    form.append("file", imgFile, "image.jpeg");
    // console.log(img);

    console.log(form, imgFile);

    axios
      .post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        return res.data.result;
      });
  });

export const postFeed = async (postData: any) =>
  await instance.post(`/feeds/`, postData).then((res) => res.data);

// 쪽지
export const getLetterlists = () => {
  return instance.get(`/chattings/`).then((res) => res.data);
};

export const getLetters = async (id: number) =>
  await instance.get(`/chattings/${id}`).then((res) => res.data);

export const postLetters = async (id: number, data: string) =>
  await instance.post(`/chattings/${id}`, data).then((res) => res.data);

// Category

export const getCategories = async (groupPk: number) => {
  const result = await instance.get(`/categories/${groupPk}`);
  return result.data;
};

export const postCategory = async (name: string, groupPk: number) =>
  await instance.post(`/categories/${groupPk}`, { name }).then((res) => {
    return res.data;
  });

export const deleteCategory = async (groupPk: number, id: number) =>
  await instance.delete(`/categories/${groupPk}/${id}`).then((res) => {
    return res.data;
  });

export const updateCategory = async (
  groupPk: number,
  id: number,
  name: string
) =>
  await instance.put(`/categories/${groupPk}/${id}`, { name }).then((res) => {
    return res.data;
  });
