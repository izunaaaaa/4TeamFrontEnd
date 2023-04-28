import { getComment } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { useQuery } from "react-query";
import { CommentType } from "../interface/type";

interface UseComment {
  feedComment: CommentType[];
  refetch: any;
}

const useComment = (feedId: number): UseComment => {
  const fallback: [] = [];
  const { data: feedComment = fallback, refetch } = useQuery(
    [Querykey.feedDetail, feedId, Querykey.feedComment],
    () => getComment(feedId)
  );

  return { feedComment, refetch };
};

export default useComment;
