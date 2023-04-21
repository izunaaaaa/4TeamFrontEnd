import { getMyFeed } from "api/axios/axiosSetting";
import React from "react";
import { useInfiniteQuery } from "react-query";

const useMyFeed = (feedType: string) => {
  const fallback = [];
  const { data } = useInfiniteQuery(
    ["myFeed", feedType],
    ({ pageParam = `/users/me/${feedType}/` }) => getMyFeed(pageParam),
    {
      getNextPageParam: (lastpage) => {
        if (lastpage.total_pages - lastpage.now_page > 0)
          return `/users/me/${feedType}/?page=${lastpage.now_page + 1}`;
        else {
          return undefined;
        }
      },
    }
  );

  return { data };
};

export default useMyFeed;
