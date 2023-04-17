import { getFeedDetail } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { FeedDetail } from "interface/Interface";
import { useQuery } from "react-query";

interface UseFeedDetail {
  feedDetail: FeedDetail;
}

const useFeedDetail = (
  groupPk: number,
  category: string,
  feedID: number
): UseFeedDetail => {
  const fallBack: [] = [];
  const { data: feedDetail = fallBack } = useQuery(
    [Querykey.feedDetail, groupPk, category, feedID],
    () => getFeedDetail(groupPk, category, feedID)
  );

  return { feedDetail };
};

export default useFeedDetail;
