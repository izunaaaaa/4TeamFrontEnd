import { getFeedDetail } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";

import { useQuery } from "react-query";
import { DefaultFeedData } from "../interface/type";

interface UseFeedDetail {
  feedDetail: DefaultFeedData;
  isLoading: boolean;
  refetch: any;
}

const useFeedDetail = (feedID: string | undefined): UseFeedDetail => {
  const fallBack: [] = [];
  const {
    data: feedDetail = fallBack,
    isLoading,
    refetch,
  } = useQuery([Querykey.feedDetail, feedID], () => getFeedDetail(feedID));
  //
  return { feedDetail, isLoading, refetch };
};

export default useFeedDetail;
