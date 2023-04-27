import { getSearchData, getSearchFeed } from "api/axios/axiosSetting";
import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";

interface SearchResult {
  result: Type[];
}

interface Type {
  id: number;
  title: string;
}

interface UseSearchData {
  searchResults: any;
  searchDataRefetch: any;
}

interface UseSearchData {
  searchResults: any;
  fetchNextPage: (options?: any) => Promise<any>;
  isFetching: boolean;
  isLoading: boolean;
  hasNextPage?: boolean;
  searchDataRefetch: any;
}

const useSearchData = (
  groupId: number | string,
  keyword: string | undefined
): UseSearchData => {
  const {
    data: searchResults = [],
    refetch: searchDataRefetch,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["searchFeed", keyword],
    ({
      pageParam = `/feeds/group/search/?group_id=${groupId}&keyword=${keyword}`,
    }) => getSearchFeed(pageParam),

    {
      getNextPageParam: (lastpage) => {
        if (lastpage?.total_pages - lastpage.now_page > 0)
          return `//feeds/group/search/?group_id=${groupId}/?page=${
            lastpage.now_page + 1
          }`;
        else {
          return undefined;
        }
      },
    }
  );

  return {
    searchResults,
    fetchNextPage,
    searchDataRefetch,
    isLoading,
    hasNextPage,
    isFetching,
  };
};

export default useSearchData;
