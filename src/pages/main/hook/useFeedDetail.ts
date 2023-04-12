import { getFeedDetail } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { FeedDetail } from "interface/Interface";
import React from "react";
import { useQuery } from "react-query";

interface UseFeedDetail {
  feedDetail: FeedDetail;
}

const useFeedDetail = (feedID: number, group: string): UseFeedDetail => {
  const fallBack: [] = [];
  const { data: feedDetail = fallBack } = useQuery(
    [Querykey.feedDetail, feedID, group],
    () => getFeedDetail(feedID, group)
  );

  console.log(feedDetail);

  return { feedDetail };
};

export default useFeedDetail;
