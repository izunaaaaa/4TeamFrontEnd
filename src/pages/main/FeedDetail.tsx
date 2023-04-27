import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  HStack,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import styles from "./FeedDetail.module.scss";
import moment from "moment";
import useFeedDetail from "./hook/useFeedDetail";
import Comment from "./Comment";
import "moment/locale/ko";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Querykey } from "api/react-query/QueryKey";
import { FiMessageSquare } from "react-icons/fi";
import FeedOption from "./FeedOption";
import LikeBtn from "./LikeBtn";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "components/form/User/Hook/useUser";
import { postComment } from "api/axios/axiosSetting";

const FeedDetail = (props: any) => {
  const { feedId } = useParams();
  const { LoginUserData } = useUser();
  const refetchFeed = props.feedRefetch;
  const navigate = useNavigate();

  const {
    feedDetail: feedData,
    isLoading,
    refetch: refetchFeedDetail,
  } = useFeedDetail(feedId);

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  const successRefetch = {
    onSuccess: () => {
      refetchFeedDetail();
      queryClient.invalidateQueries(Querykey.feedData);
      queryClient.invalidateQueries([feedData.id, Querykey.feedComment]);
    },
  };

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
  const writeTime = moment(feedData.created_at).fromNow();

  return (
    <Modal
      isOpen={true}
      onClose={() => navigate(-1)}
      size={{
        md: "xl",
        sm: "sm",
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent padding="0px 25px">
        <Box paddingTop="30px">
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
            <HStack
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              {feedData?.thumbnail && (
                <Image src={feedData?.thumbnail} margin="20px 0" />
              )}
              <Box>
                <p className={styles.feedTitle}>{feedData.title}</p>
                <p className={styles.feedDescription}>{feedData.description}</p>
              </Box>
            </HStack>
            <ButtonGroup margin="5px 0 5px 0">
              <LikeBtn
                id={feedId}
                likeCount={feedData.like_count}
                isLike={feedData.is_like}
              />
              <Button
                backgroundColor={"transparent"}
                margin={0}
                padding={2}
                leftIcon={<FiMessageSquare />}
              >
                {feedData.comments_count}
              </Button>
            </ButtonGroup>

            <Comment feedId={feedId} />
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
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default FeedDetail;
