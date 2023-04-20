import { Avatar, Box, Button, Flex, HStack, Input } from "@chakra-ui/react";
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
import { useMutation } from "react-query";
import { postRecomment } from "api/axios/axiosSetting";
import useUser from "components/form/User/Hook/useUser";
import useComment from "./hook/useComment";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Comment = (props) => {
  const feedId = props.feedId;
  const { register, handleSubmit, reset } = useForm();
  const { LoginUserData } = useUser();
  const { feedComment, refetch } = useComment(feedId);

  const [selectComment, setSelectComment] = useState(null);

  /**댓글 버튼 이벤트 */
  const btnHandler = async (e, id) => {
    reset();
    setSelectComment(id);
    const targetValue = e.target.value;
    if (targetValue === "recomment") {
      // setRecommentInput(!recommentInput);
    }
    if (targetValue === "like") {
    }
  };

  /**대댓글 달기 */
  const { mutateAsync: postRecommentHandler, isLoading } = useMutation(
    (description) => postRecomment(feedId, selectComment, description),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const submitRecommentHandler = async (description) => {
    await postRecommentHandler(description);

    reset();
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
                <Flex onClick={(e) => btnHandler(e, comment.id)}>
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

                  {comment.user.username !== LoginUserData.username ? (
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
              {comment.recomment.map((recomment, index) => (
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
                      <p className={styles.commentName}>익명{comment.id}</p>
                      <Box fontSize="0.9rem">{recomment.description}</Box>
                      <Flex margin="4px 0 0 0">
                        <Box fontSize="0.8rem">{commentWriteTime}</Box>
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
