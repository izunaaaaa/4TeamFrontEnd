import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  HStack,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FeedDetail.module.scss";
import moment from "moment";
import useFeedDetail from "./hook/useFeedDetail";
import Comment from "./Comment";
import "moment/locale/ko";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { postComment, postFeedLike } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";

const FeedDetail = (props: any) => {
  const feedData = props.feedData;
  const {
    feedDetail,
    isLoading,
    refetch: refetchFeedDetail,
  } = useFeedDetail(feedData.id);
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  /**게시물 좋아요 */
  const { mutate: feedLikeHandler } = useMutation(
    (feedId: number) => {
      const data = {
        feed: feedId,
      };
      return postFeedLike(data);
    },
    {
      onSuccess: () => {
        refetchFeedDetail();
        queryClient.invalidateQueries(Querykey.feedData);
      },
    }
  );

  /**댓글달기 */
  const { mutateAsync: commentSubmitHandler, isLoading: commentLoading } =
    useMutation((comment: any) => postComment(feedData.id, comment), {
      onSuccess: () => {
        refetchFeedDetail();
        queryClient.invalidateQueries([feedData.id, Querykey.feedComment]);
      },
    });

  const commentSubmit = async (data: any) => {
    await commentSubmitHandler(data);
    reset();
  };

  /**작성시간 */
  const writeTime = moment(feedDetail.created_at).fromNow();

  if (isLoading)
    return (
      <Center h="600px">
        <Spinner size="xl" margin="20px" />
      </Center>
    );

  return (
    <>
      <div className={styles.feedDetailDiv}>
        <div className={styles.writerName}>
          <Avatar
            name="익명"
            size="sm"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          />
          <h1>
            <p>익명의 개발자</p>
            {writeTime}
          </h1>
        </div>
        <HStack display="flex" flexDirection="column" alignItems="flex-start">
          <Image src={feedDetail?.images[0]?.url} />
          <Box>
            <p className={styles.feedTitle}>{feedDetail.title}</p>
            <p className={styles.feedDescription}>{feedDetail.description}</p>
          </Box>
        </HStack>
        <ButtonGroup margin="5px 0 5px 0">
          <Button
            backgroundColor={"transparent"}
            margin={0}
            padding={2}
            leftIcon={<FontAwesomeIcon icon={faThumbsUp} size="lg" />}
            onClick={() => feedLikeHandler(feedData.id)}
          >
            {feedDetail.like_count}
          </Button>
          <Button
            backgroundColor={"transparent"}
            margin={0}
            padding={2}
            leftIcon={<FontAwesomeIcon icon={faMessage} size="lg" />}
          >
            {feedDetail.comments_count}
          </Button>
        </ButtonGroup>

        <Comment feedId={feedData.id} />
      </div>
      <form
        className={styles.commentInput}
        onSubmit={handleSubmit(commentSubmit)}
      >
        <textarea
          placeholder="댓글달기"
          {...register("description", {
            required: true,
          })}
        />
        <Button
          type="submit"
          onSubmit={handleSubmit(commentSubmit)}
          isLoading={commentLoading}
          h="48px"
        >
          게시
        </Button>
      </form>
    </>
  );
};

export default FeedDetail;
