import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  faArrowTurnUp,
  faMessage,
  faPaperPlane,
  faThumbsUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Comment.module.scss";
import moment from "moment";
import "moment/locale/ko";
import { useMutation, useQueryClient } from "react-query";
import {
  deleteComment,
  deleteRecomment,
  postCommentLike,
  postRecomment,
  postRecommentLike,
} from "api/axios/axiosSetting";
import useUser from "components/form/User/Hook/useUser";
import useComment from "./hook/useComment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Querykey } from "api/react-query/QueryKey";

const Comment = (props) => {
  const feedId = props.feedId;
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();
  const { LoginUserData } = useUser();
  const { feedComment, refetch: refetchComment } = useComment(feedId);

  const [selectComment, setSelectComment] = useState(null);

  const queryClient = useQueryClient();

  const successRefetch = {
    onSuccess: () => {
      refetchComment();
    },
  };

  const successPost = () => {
    queryClient.invalidateQueries([Querykey.feedData]);
    queryClient.invalidateQueries([Querykey.feedDetail, feedId]);
    refetchComment();
  };

  /**댓글 삭제 */
  const { mutate: deleteCommentHandler } = useMutation(
    (id) => deleteComment(id),
    {
      onSuccess: () => {
        successPost();
        toast({ title: "댓글이 삭제되었습니다.", status: "success" });
      },
    }
  );

  /**댓글/대댓글 좋아요 */
  const { mutate: commentLikeHandler } = useMutation((commentData) => {
    console.log(commentData);
    postCommentLike(commentData);
  }, successRefetch);

  /**대댓글 달기 */
  const { mutateAsync: postRecommentHandler, isLoading } = useMutation(
    (description) => postRecomment(feedId, selectComment, description),
    {
      onSuccess: () => {
        successPost();
      },
    }
  );
  const submitRecommentHandler = async (description) => {
    await postRecommentHandler(description);
    reset();
    setSelectComment(null);
  };
  /**대댓글 삭제 */
  const { mutate: deleteRecommentHandler } = useMutation(
    (recommentData) => deleteRecomment(recommentData),
    {
      onSuccess: () => {
        successPost();
        toast({ title: "대댓글이 삭제되었습니다.", status: "success" });
      },
    }
  );

  /**댓글 버튼 이벤트 */
  const btnHandler = async (e, id, commentType) => {
    reset();
    const targetValue = e.target.value;
    const data = {
      id,
      commentType,
    };
    if (targetValue === "like") {
      return commentLikeHandler(data);
    }
    if (targetValue === "recomment") return setSelectComment(id);

    if (targetValue === "delete") {
      if (commentType === "comment") {
        return deleteCommentHandler(data);
      } else {
        return deleteRecommentHandler(data);
      }
    }
  };

  return (
    <>
      {feedComment?.map((comment, index) => {
        const commentWriteTime = moment(comment.created_at).fromNow();
        return (
          <Flex key={index} width="100%">
            <Box margin="10px 0 5px 5px">
              <Avatar
                name="익명"
                size="xs"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              />
            </Box>
            <Box padding="10px" lineHeight="5" maxW="500px" w="90%">
              <Flex justifyContent="space-between" marginBottom="2px">
                <Box fontWeight="bold">익명{index + 1}</Box>
                <Flex onClick={(e) => btnHandler(e, comment.id, "comment")}>
                  <Button
                    backgroundColor={"transparent"}
                    height="20px"
                    padding="0 4px"
                    value="like"
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </Button>
                  <Button
                    backgroundColor={"transparent"}
                    height="20px"
                    padding="0 1px"
                    value="recomment"
                  >
                    <FontAwesomeIcon icon={faMessage} />
                  </Button>

                  {comment.user.pk !== LoginUserData.id ? (
                    <Button
                      backgroundColor={"transparent"}
                      height="20px"
                      padding="0 1px"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                  ) : (
                    <Button
                      backgroundColor={"transparent"}
                      height="20px"
                      padding="0 1px"
                      value="delete"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  )}
                </Flex>
              </Flex>
              <Box fontSize="0.9rem">{comment.description}</Box>
              <HStack marginTop="2px" fontSize="0.8rem" spacing="4px">
                <Box>{commentWriteTime}</Box>
                {comment.commentlikeCount > 0 && (
                  <>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      size="xs"
                      style={{ color: "red" }}
                    />
                    <Box color="red">{comment.commentlikeCount}</Box>
                  </>
                )}
              </HStack>
              {comment.id === selectComment ? (
                <form
                  className={styles.recommentForm}
                  h={"30px"}
                  display="flex"
                  onSubmit={handleSubmit(submitRecommentHandler)}
                >
                  <Input
                    h="100%"
                    w="100%"
                    placeholder="댓글을 입력해주세요."
                    {...register("description", {
                      required: true,
                    })}
                  />
                  <Button
                    h={"100%"}
                    type="submit"
                    isLoading={isLoading}
                    onSubmit={handleSubmit(submitRecommentHandler)}
                  >
                    답글
                  </Button>
                </form>
              ) : null}
              {comment.recomment?.map((recomment, index) => (
                <Flex key={index} marginTop="10px">
                  <Box lineHeight={5} margin="10px">
                    <FontAwesomeIcon
                      icon={faArrowTurnUp}
                      rotation={90}
                      size="lg"
                    />
                  </Box>
                  <Flex
                    key={index}
                    width="400px"
                    borderRadius="lg"
                    borderWidth="1px"
                  >
                    <Box margin="10px 0 5px 5px">
                      <Avatar
                        name="익명"
                        size="xs"
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                      />
                    </Box>
                    <Box padding="10px" lineHeight="5" width="100%">
                      <Flex justifyContent="space-between" marginBottom="2px">
                        <Box fontWeight="bold">익명{recomment.pk}</Box>
                        <Flex
                          onClick={(e) =>
                            btnHandler(e, recomment.pk, "recomment")
                          }
                        >
                          <Button
                            backgroundColor={"transparent"}
                            height="20px"
                            padding="0 4px"
                            value="like"
                          >
                            <FontAwesomeIcon icon={faThumbsUp} />
                          </Button>
                          {recomment.user.pk !== LoginUserData.id ? (
                            <Button
                              backgroundColor={"transparent"}
                              height="20px"
                              padding="0 1px"
                            >
                              <FontAwesomeIcon icon={faPaperPlane} />
                            </Button>
                          ) : (
                            <Button
                              backgroundColor={"transparent"}
                              height="20px"
                              padding="0 1px"
                              value="delete"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </Button>
                          )}
                        </Flex>
                      </Flex>
                      <Box fontSize="0.9rem">{recomment.description}</Box>
                      <Flex margin="4px 0 0 0">
                        <HStack fontSize="0.8rem" spacing="4px">
                          <Box>{commentWriteTime}</Box>
                          {recomment.commentlikeCount > 0 && (
                            <>
                              <FontAwesomeIcon
                                icon={faThumbsUp}
                                size="xs"
                                style={{ color: "red" }}
                              />
                              <Box color="red">
                                {recomment.commentlikeCount}
                              </Box>
                            </>
                          )}
                        </HStack>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              ))}
            </Box>
          </Flex>
        );
      })}
    </>
  );
};

export default Comment;
