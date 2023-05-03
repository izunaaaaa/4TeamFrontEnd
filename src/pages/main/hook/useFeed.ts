import { useInfiniteQuery } from "react-query";
import { Querykey } from "api/react-query/QueryKey";
import { getFeeds } from "api/axios/axiosSetting";
import { useNavigate } from "react-router-dom";

interface UseFeed {
  feedData: any;
  fetchNextPage: (options?: any) => Promise<any>;
  isFetching: boolean;
  isLoading: boolean;
  hasNextPage?: boolean;
  refetch: any;
}

export const useFeed = (
  groupPk: string | undefined,
  categoryId: string | undefined
): UseFeed => {
  const navigate = useNavigate();
  const fallBack: [] = [];
  const {
    data: feedData = fallBack,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteQuery(
    [Querykey.feedData, categoryId],
    ({
      pageParam = `/feeds/group/category/?group_id=${groupPk}&category_id=${categoryId}`,
    }) => getFeeds(pageParam),
    {
      getNextPageParam: (lastpage) => {
        if (lastpage.total_pages - lastpage.now_page > 0)
          return `/feeds/group/category/?group_id=${groupPk}&category_id=${categoryId}&page=${
            lastpage.now_page + 1
          }`;
        else {
          return undefined;
        }
      },
      retry: false,
      onError: (err) => {
        navigate("/error");
      },
    }
  );

  return {
    feedData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    refetch,
  };
};
