import axios from "axios";
import { LoginData, SignUpData } from "components/form/User/interface/type";
import { accessData, accessUser } from "components/mypages/interface/type";
import { accessInform } from "components/mypages/myProfile/AccessInform";
import Cookie from "js-cookie";
import { Description } from "pages/main/interface/type";
export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/api/v1/"
      : "https://backend.curb.site",
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

export const postAccessList = async (accessData: accessData) =>
  await instance.post(`/access/`, accessData).then((res) => res.data);

export const logout = async () => {
  await instance.post(`/users/logout/`);
};

export const login = async (data: LoginData) =>
  await instance.post(`/users/login/`, data).then((res) => res.data);

export const findId = async (data: any) =>
  await instance.post(`/users/find/id/`, data).then((res) => res.data);

export const findPassword = async (data: any) =>
  await instance.post("users/find/password/", data).then((res) => res.data);

export const changePassword = async (data: any) =>
  await instance.put("/users/new-password/", data).then((res) => res.data);

/**로그인한 유저 정보 받기 */
export const getUserData = async () =>
  await instance.get(`/users/me/`).then((res) => res.data);

/**Feed */
export const getFeeds = async (url: string) =>
  await instance.get(url).then((res) => {
    return res.data;
  });

export const postFeedLike = async (feedId: any) =>
  await instance
    .post(`/likes/feedlike/${feedId?.id}`, feedId)
    .then((res) => res.data);

export const getFeedDetail = async (feedId: string | undefined) =>
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

export const deleteComment = async (commentData: any) =>
  await instance.delete(`/comments/${commentData.id}`);

export const postCommentLike = async (commentData: any) =>
  await instance
    .post(
      `likes/${commentData?.commentType}like/${commentData.id}`,
      commentData.id
    )
    .then((res) => res.data);

/**recomment */
export const postRecomment = async (
  feedId: string | undefined,
  commentId: string | null,
  description: Description
) =>
  await instance
    .post(`/feeds/${feedId}/comment/${commentId}/recomment/`, description)
    .then((res) => res.data);

export const deleteRecomment = async (recommentData: any) =>
  await instance
    .delete(`/comments/recomments/${recommentData?.id}`)
    .then((res) => res.data);

/**Feed 올리기 */
export const getFeedCategory = async (group: number) =>
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

//쪽지 차단
export const deleteLetterlists = async (id: number) => {
  await instance.delete(`letterlist/${id}`).then((res) => res.data);
};

//쪽지 조회
export const getLetters = async (chatId: number) =>
  await instance.get(`letterlist/${chatId}`).then((res) => res.data);

// 쪽지 보내기
export const postLetters = async (data: { receiver: number; text: string }) => {
  try {
    const response = await instance.post(`/letterlist/message/`, {
      receiver: data.receiver,
      text: data.text,
    });
    console.log("Response received:", response.data); // 응답 출력
    return response.data;
  } catch (error) {
    console.error("Error during request:", error);
    throw error;
  }
};

// 쪽지 삭제
export const deleteLetters = async (textId: number) => {
  if (textId) {
    try {
      const response = await instance.delete(`/letterlist/message/${textId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("textId is undefined");
  }
};

/**MyPage  */
export const getMyFeed = async (url: string) =>
  await instance.get(url).then((res) => res.data);

export const getAccess = async (groupPk: number) =>
  await instance.get(`/access/group/${groupPk}`).then((res) => res.data);

export const postAccess = async (postAccessData: accessUser, groupPk: number) =>
  await instance
    .post(`/access/group/${groupPk}`, postAccessData)
    .then((res) => res.data);

export const putAccess = async (
  putAccessData: accessUser,
  accessInform: accessInform
) =>
  await instance
    .put(
      `/access/group/${accessInform.groupPk}/${accessInform.userId}`,
      putAccessData
    )
    .then((res) => res.data);

export const deleteAccess = async (accessInform: accessInform) =>
  await instance
    .delete(`/access/group/${accessInform.groupPk}/${accessInform.userId}`)
    .then((res) => res.data);

export const getCategories = async (groupPk: number) =>
  await instance.get(`/categories/${groupPk}`).then((res) => res.data);

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

export const getSearchData = async (
  groupId: number | string,
  keyword: string | undefined
) => {
  const result = await instance.get(
    `/feeds/group/search/?group_id=${groupId}&keyword=${keyword}`
  );
  return result.data;
};

export const getSearchFeed = async (url: string) =>
  await instance.get(url).then((res) => res.data);
