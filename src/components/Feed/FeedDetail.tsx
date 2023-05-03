import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import styles from "./FeedDetail.module.scss";
import moment from "moment";
import useFeedDetail from "../../pages/main/hook/useFeedDetail";
import "moment/locale/ko";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Querykey } from "api/react-query/QueryKey";
import FeedOption from "./FeedOption";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "components/form/User/Hook/useUser";
import { postComment } from "api/axios/axiosSetting";
import { useCallback, useRef } from "react";
import FeedDetailContents from "./FeedDetailContents";

export interface CommentForm {
  description: string;
}

const FeedDetail = () => {
  const { feedId } = useParams();
  const { LoginUserData } = useUser();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<CommentForm>();

  const groupName = LoginUserData.group.name;

  const {
    feedDetail: feedData,
    isLoading,
    refetch: refetchFeedDetail,
  } = useFeedDetail(Number(feedId));
  const queryClient = useQueryClient();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const successRefetch = {
    onSuccess: async () => {
      refetchFeedDetail();
      queryClient.invalidateQueries(Querykey.feedData);

      await queryClient.invalidateQueries([
        "feedDetail",
        String(feedData.id),
        "feedComment",
      ]);

      scrollToBottom();
    },
  };

  /**아래로 스크롤 */
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [feedData]);

  /**댓글달기 */
  const { mutateAsync: commentSubmitHandler, isLoading: commentLoading } =
    useMutation(
      (comment: CommentForm) => postComment(feedData.id, comment),

      successRefetch
    );

  const commentSubmit = async (data: CommentForm) => {
    await commentSubmitHandler(data);
    reset();
  };

  /**작성시간 */
  const writeTime = moment(feedData.created_at).fromNow();

  if (isLoading)
    return (
      <Center h="600px">
        <Spinner size="xl" margin="20px" />
      </Center>
    );

  return (
    <>
      <Modal
        isOpen={true}
        onClose={() => navigate(-1)}
        size={{
          md: "xl",
          sm: "lg",
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent margin="0" padding="20px 25px 0px 25px" width="100%">
          <Box height="100%">
            <div className={styles.writerName}>
              <Avatar
                name="익명"
                size="sm"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              />
              <Flex justifyContent="space-between" w="100%">
                <h1>
                  <p>{groupName}의 개발자</p>
                  {writeTime}
                </h1>
                <FeedOption data={feedData} LoginUserData={LoginUserData} />
              </Flex>
            </div>
            <FeedDetailContents
              feedData={feedData}
              feedId={feedId}
              scrollRef={scrollRef}
            />
            <Container
              as="form"
              onKeyDown={(e: any) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(commentSubmit)();
                }
              }}
              className={styles.commentInput}
            >
              <textarea
                placeholder="댓글달기"
                {...register("description", {
                  required: true,
                })}
              />
              <Button
                isLoading={commentLoading}
                h="100%"
                onClick={handleSubmit(commentSubmit)}
              >
                게시
              </Button>
            </Container>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeedDetail;
