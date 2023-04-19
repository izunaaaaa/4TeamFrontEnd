import { getFeedDetail } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";

import { useQuery } from "react-query";
import { DefaultFeedData } from "../interface/type";

interface UseFeedDetail {
  feedDetail: DefaultFeedData;
}

const useFeedDetail = (feedID: number): UseFeedDetail => {
  const fallBack: [] = [];
  const { data: feedDetail = fallBack } = useQuery(
    [Querykey.feedDetail, feedID],
    () => getFeedDetail(feedID)
  );

  return { feedDetail };
};

export default useFeedDetail;
