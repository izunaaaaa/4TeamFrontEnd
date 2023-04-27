import { getMyFeed } from "api/axios/axiosSetting";
import { useInfiniteQuery } from "react-query";

interface UseMyFeed {
  data: any;
  isLoading: boolean;
  fetchNextPage: (options?: any) => Promise<any>;
  hasNextPage?: boolean;
  isFetching: boolean;
}

const useMyFeed = (feedType: string | undefined): UseMyFeed => {
  const fallback: [] = [];

  const {
    data = fallback,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
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

  return { data, isLoading, fetchNextPage, hasNextPage, isFetching };
};

export default useMyFeed;
