import useMyFeed from "components/mypages/Hook/useMyFeed";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { likeState } from "recoil/feedlike";
import Header from "./header/Header";

const Layout = () => {
  /**내가 좋아요한 데이터 */
  const { data: myLikeFeed, isLoading: isLikeLoading } = useMyFeed("feedlike");
  const setLike = useSetRecoilState(likeState);
  const likeFeed =
    myLikeFeed?.pages[0]?.results?.map((likefeed: any) => {
      return likefeed.id;
    }) ?? [];

  useEffect(() => {
    setLike(likeFeed);
  }, [isLikeLoading]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
