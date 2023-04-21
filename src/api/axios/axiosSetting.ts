import axios from "axios";
import { LoginData, SignUpData } from "components/form/User/interface/type";
import Cookie from "js-cookie";
export const instance = axios.create({
  // baseURL: BASE_URL,
  baseURL: "/api/v1/",
  headers: {
    "X-CSRFToken": Cookie.get("csrftoken") || "",
  },
  withCredentials: true,
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

/**로그인한 유저 정보 받기 */
export const getUserData = async () =>
  await instance.get(`/users/me/`).then((res) => res.data);

/**Feed */
export const getFeeds = async (url: string) =>
  await instance.get(url).then((res) => {
    return res.data;
  });

export const postFeedLike = async (feedId: object) =>
  await instance.post(`/users/me/feedlike/`, feedId).then((res) => res.data);

export const getFeedDetail = async (feedId: number) =>
  await instance.get(`/feeds/${feedId}/`).then((res) => {
    return res.data;
  });

/**comment */
export const getComment = async (feedId: number) =>
  await instance.get(`/feeds/${feedId}/comment/`).then((res) => res.data);

export const postComment = async (feedId: number, commentData: object) =>
  await instance
    .post(`/feeds/${feedId}/comment/`, commentData)
    .then((res) => res.data);

export const postCommentLike = async (commentId: number) =>
  await instance.post(`likes/commentlike/${commentId}`).then((res) => res.data);

export const postRecomment = async (
  feedId: number,
  commentId: number,
  description: object
) =>
  await instance
    .post(`/feeds/${feedId}/comment/${commentId}/recomment/`, description)
    .then((res) => res.data);

export const postRecommentLike = async (recommentId: number) =>
  await instance
    .post(`likes/recommentlike/${recommentId}`)
    .then((res) => res.data);

/**Feed 올리기 */
export const getFeedCategory = async (group: string) =>
  await instance.get(`/categories/${group}`).then((res) => res.data);

export const postUploadUrl = async (imgFile: File) =>
  await instance.post(`/media/uploadURL`).then(async (res) => {
    let resImgUrl = "";
    const url = res.data.uploadURL;

    const form = new FormData();
    form.append("file", imgFile);

    await axios
      .post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resImgUrl = res.data.result.variants[0];
      });

    return resImgUrl;
  });

export const postFeed = async (postData: any) =>
  await instance.post(`/feeds/`, postData).then((res) => res.data);

/**Feed 수정하기 */
export const updateFeed = async (feedId: number, updateData: any) =>
  await instance.put(`/feeds/${feedId}/`, updateData).then((res) => res.data);

/**Feed 삭제하기 */
export const deleteFeed = async (feedId: number) =>
  await instance.delete(`/feeds/${feedId}`).then((res) => res.data);

//쪽지 목록 조회
export const getLetterlists = async () => {
  const res = await instance.get(`letterlist/me/`);
  return res.data;
};

// 쪽지 보내기
export const postLetters = async (data: string) =>
  await instance.post(`/letterlist/message/`, data).then((res) => res.data);

// 쪽지 삭제
export const deleteLetters = async (id: number) =>
  await instance.delete(`/letterlist/message/${id}`).then((res) => res.data);

//쪽지 조회
export const getLetters = async (id: number) =>
  await instance.get(`/letterlist/message/${id}`).then((res) => res.data);

// 쪽지 목록 지우기
export const deleteLetterList = async (id: number) =>
  await instance.delete(`/letterlist/${id}`).then((res) => res.data);

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
  await instance
    .delete(`/categories/${groupPk}/${id}/`)
    .then((res) => res.data);

export const updateCategory = async (
  groupPk: number,
  id: number,
  name: string
) =>
  await instance.put(`/categories/${groupPk}/${id}/`, { name }).then((res) => {
    return res.data;
  });
