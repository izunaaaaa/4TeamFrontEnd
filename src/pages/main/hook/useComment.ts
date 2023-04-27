import { getComment } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { useQuery } from "react-query";

const useComment = (feedId: number) => {
  const fallback: [] = [];
  const { data: feedComment = fallback, refetch } = useQuery(
    [Querykey.feedDetail, feedId, Querykey.feedComment],
    () => getComment(feedId)
  );

  return { feedComment, refetch };
};

export default useComment;
