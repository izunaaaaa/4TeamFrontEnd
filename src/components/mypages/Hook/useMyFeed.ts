import { getMyFeed } from "api/axios/axiosSetting";
import { useInfiniteQuery } from "react-query";

const useMyFeed = (feedType: string | undefined) => {
  const fallback: [] = [];
  const { data, isLoading = fallback } = useInfiniteQuery(
    ["myFeed", feedType],
    async ({ pageParam = `/users/me/${feedType}/` }) =>
      await getMyFeed(pageParam),
    {
      getNextPageParam: (lastpage) => {
        if (lastpage.total_pages - lastpage.now_page > 0)
          return `/users/me/${feedType}/?page=${lastpage.now_page + 1}`;
        else {
          return undefined;
        }
      },
      retry: false,
      refetchOnWindowFocus: false,
      onError: () => {
        return;
      },
    }
  );

  return { data, isLoading };
};

export default useMyFeed;
