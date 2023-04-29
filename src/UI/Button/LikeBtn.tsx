import { Box, Button } from "@chakra-ui/react";
import { postFeedLike } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { FiThumbsUp } from "react-icons/fi";

const LikeBtn = (props: any) => {
  const id = props.id;
  const likeCount = props.likeCount;
  const isLike = props.isLike;
  const [isdefaultLike, setIsdefaultLike] = useState(isLike);
  const [defaultLikeCount, setDefaultLikeCount] = useState(likeCount);

  useEffect(() => {
    setDefaultLikeCount(likeCount);
    setIsdefaultLike(isLike);
  }, [likeCount, isLike]);

  /**좋아요누르기 */
  // const queryClient = useQueryClient();

  const { mutateAsync: likeHandler } = useMutation(
    (feedID: object) => {
      return postFeedLike(feedID);
    },
    {
      onSuccess: () => {
        // queryClient.invalidateQueries(Querykey.feedData);
        // queryClient.invalidateQueries([id, Querykey.feedComment]);
        // queryClient.invalidateQueries([Querykey.feedDetail, id]);
      },
    }
  );

  const onLike = async (feedId: any, likeCount: number) => {
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
};

export default LikeBtn;
