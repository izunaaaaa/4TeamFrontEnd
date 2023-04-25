import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  HStack,
  Image,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import styles from "./FeedDetail.module.scss";
import moment from "moment";
import useFeedDetail from "./hook/useFeedDetail";
import Comment from "./Comment";
import "moment/locale/ko";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { postComment, postFeedLike } from "api/axios/axiosSetting";
import { Querykey } from "api/react-query/QueryKey";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { likeState } from "recoil/feedlike";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import FeedOption from "./FeedOption";

const FeedDetail = (props: any) => {
  const feedData = props.feedData;
  const LoginUserData = props.LoginUserData;
  const refetchFeed = props.feedRefetch;

  const [select, setSelect] = useRecoilState<any>(likeState);

  const {
    feedDetail,
    isLoading,
    refetch: refetchFeedDetail,
  } = useFeedDetail(feedData.id);

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  const successRefetch = {
    onSuccess: () => {
      refetchFeedDetail();
      queryClient.invalidateQueries(Querykey.feedData);
      queryClient.invalidateQueries([feedData.id, Querykey.feedComment]);
    },
  };

  /**게시물 좋아요 */
  const { mutate: feedLikeHandler } = useMutation((feedId: object) => {
    return postFeedLike(feedId);
  }, successRefetch);

  /**댓글달기 */
  const { mutateAsync: commentSubmitHandler, isLoading: commentLoading } =
    useMutation(
      (comment: any) => postComment(feedData.id, comment),
      successRefetch
    );

  const commentSubmit = async (data: any) => {
    await commentSubmitHandler(data);
    reset();
  };

  if (isLoading)
    return (
      <Center h="600px">
        <Spinner size="xl" margin="20px" />
      </Center>
    );

  /**작성시간 */
  const writeTime = moment(feedDetail.created_at).fromNow();

  return (
    <>
      <div className={styles.writerName}>
        <Avatar
          name="익명"
          size="sm"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        />
        <Flex justifyContent="space-between" w="100%">
          <h1>
            <p>익명의 개발자</p>
            {writeTime}
          </h1>
          <FeedOption
            data={feedData}
            LoginUserData={LoginUserData}
            refetchFeed={refetchFeed}
          />
        </Flex>
      </div>
      <div className={styles.feedDetailDiv}>
        <HStack display="flex" flexDirection="column" alignItems="flex-start">
          {feedDetail?.thumbnail && (
            <Image src={feedDetail?.thumbnail} margin="20px 0" />
          )}
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
            leftIcon={<FiThumbsUp />}
            color={select.includes(feedData.id) ? "red" : "black"}
            onClick={() => {
              !select.includes(feedData.id)
                ? setSelect((select: any) => [...select, feedData.id])
                : setSelect(
                    select.filter((button: number) => button !== feedData.id)
                  );
              const feedId = {
                id: feedData.id,
              };
              feedLikeHandler(feedId);
            }}
          >
            <Box color="black">{feedDetail.like_count}</Box>
          </Button>
          <Button
            backgroundColor={"transparent"}
            margin={0}
            padding={2}
            leftIcon={<FiMessageSquare />}
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
          h="100%"
        >
          게시
        </Button>
      </form>
    </>
  );
};

export default FeedDetail;
