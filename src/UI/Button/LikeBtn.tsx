import { Box, Button } from "@chakra-ui/react";
import { postFeedLike } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { FiThumbsUp } from "react-icons/fi";

interface LikeBtnProps {
  id: string | undefined;
  likeCount: number;
  isLike: boolean;
  feedDetail?: boolean;
}

export interface FeedId {
  id: string | undefined;
}

function LikeBtn({ id, likeCount, isLike, feedDetail }: LikeBtnProps) {
  const [isdefaultLike, setIsdefaultLike] = useState(isLike);
  const [defaultLikeCount, setDefaultLikeCount] = useState(likeCount);

  const successRefetch = feedDetail
    ? {
        onSuccess: () => {
          queryClient.invalidateQueries(Querykey.feedData);
          queryClient.invalidateQueries([Querykey.feedDetail, id]);
        },
      }
    : {
        onSuccess: () => {
          queryClient.invalidateQueries(Querykey.feedData);
        },
      };

  useEffect(() => {
    setDefaultLikeCount(likeCount);
    setIsdefaultLike(isLike);
  }, [likeCount, isLike]);

  /**좋아요누르기 */
  const queryClient = useQueryClient();

  const { mutateAsync: likeHandler } = useMutation((feedID: FeedId) => {
    return postFeedLike(feedID);
  }, successRefetch);

  const onLike = async (feedId: FeedId, likeCount: number) => {
    if (isLike) {
      setDefaultLikeCount(likeCount - 1);
      setIsdefaultLike(false);
    } else {
      setDefaultLikeCount(likeCount + 1);
      setIsdefaultLike(true);
    }
    await likeHandler(feedId);
  };

  return (
    <Button
      key={id}
      value={id}
      padding="0px 5px"
      margin="0px"
      backgroundColor="transparent"
      leftIcon={<FiThumbsUp />}
      color={isdefaultLike ? "red" : "black"}
      onClick={() => {
        const feedId = {
          id: id,
        };
        onLike(feedId, likeCount);
      }}
    >
      <Box>{defaultLikeCount}</Box>
    </Button>
  );
}

export default LikeBtn;
