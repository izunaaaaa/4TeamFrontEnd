import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";

import {
  deleteComment,
  deleteRecomment,
  postCommentLike,
  postRecomment,
} from "api/axios/axiosSetting";
import useUser from "components/form/User/Hook/useUser";
import React, { useState } from "react";
import { useMutation } from "react-query";
import SendBtn from "UI/Button/SendBtn";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import moment from "moment";
import "moment/locale/ko";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const CommentCard = (props: any) => {
  const comment = props.comment;
  const index = props.index;
  const { LoginUserData } = useUser();
  const { feedId } = useParams();
  const successRefetch = props.successRefetch;
  const successPost = props.successPost;

  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  const [isOpenRecommentInput, setIsOpenRecommentInput] = useState(false);
  const [isLike, setIsLike] = useState(comment.is_like);
  const [likeCount, setLikeCount] = useState(comment.commentlikeCount);

  /**댓글/대댓글 좋아요 */
  const { mutateAsync: commentLikeHandler } = useMutation(
    (commentData: any) => {
      return postCommentLike(commentData);
    },
    successRefetch
  );

  /**댓글 삭제 */
  const { mutate: deleteCommentHandler } = useMutation(
    (id) => deleteComment(id),
    {
      onSuccess: (test) => {
        successPost();
        toast({ title: "댓글이 삭제되었습니다.", status: "success" });
      },
    }
  );

  /**대댓글 달기 */
  const { mutateAsync: postRecommentHandler, isLoading } = useMutation(
    (description: object) => postRecomment(feedId, comment.id, description),
    {
      onSuccess: () => {
        successPost();
      },
    }
  );
  const submitRecommentHandler = async (description: object) => {
    await postRecommentHandler(description);
    reset();
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
  const btnHandler = async (e: any, id: string, commentType: string) => {
    // reset();
    const targetValue = e.target.value;
    const data: any = {
      id,
      commentType,
    };
    if (targetValue === "like") {
      if (isLike) {
        setIsLike(false);
        setLikeCount(likeCount - 1);
      } else {
        setIsLike(true);
        setLikeCount(likeCount + 1);
      }
      return await commentLikeHandler(data);
    }
    if (targetValue === "recomment")
      return setIsOpenRecommentInput(!isOpenRecommentInput);

    if (targetValue === "delete") {
      if (commentType === "comment") {
        return deleteCommentHandler(data);
      } else {
        return deleteRecommentHandler(data);
      }
    }
  };

  const commentWriteTime = moment(comment.created_at).fromNow();

  return (
    <Box width="100%" display="flex" key={index}>
      <Box margin="10px 0 5px 5px">
        <Avatar
          name="익명"
          size="xs"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        />
      </Box>
      <Box padding="10px" lineHeight="5" w="100%" wordBreak="break-all">
        <Flex justifyContent="space-between" marginBottom="2px">
          <Box
            fontWeight="bold"
            color={comment.feed_writer ? "red.300" : "black"}
          >
            {comment.feed_writer ? `글쓴이` : `익명${index + 1}`}
          </Box>
          <Flex onClick={(e) => btnHandler(e, comment.id, "comment")}>
            <ButtonGroup spacing="-1.5">
              <Button
                value="like"
                color={isLike ? "red" : "black"}
                height="20px"
                padding="0 2px"
                backgroundColor={"transparent"}
              >
                <FiThumbsUp />
              </Button>

              <Button
                backgroundColor={"transparent"}
                height="20px"
                padding="0 2px"
                value="recomment"
              >
                <FiMessageSquare size="18" />
              </Button>

              {comment.user.pk !== LoginUserData.id ? (
                <SendBtn userPk={comment.user.pk} height={"20px"} />
              ) : (
                <Button
                  backgroundColor={"transparent"}
                  height="20px"
                  padding="0 1px"
                  value="delete"
                >
                  <BsTrash3 />
                </Button>
              )}
            </ButtonGroup>
          </Flex>
        </Flex>
        <Box
          fontSize="0.9rem"
          //  w="100%"
        >
          {comment.description}
        </Box>
        <HStack marginTop="2px" fontSize="0.8rem" spacing="4px">
          <Box>{commentWriteTime}</Box>
          {likeCount > 0 && (
            <>
              <FiThumbsUp style={{ color: "red" }} />
              <Box color="red">{likeCount}</Box>
            </>
          )}
        </HStack>
        {isOpenRecommentInput ? (
          <Container
            as="form"
            onSubmit={handleSubmit(submitRecommentHandler)}
            display="flex"
            h="30px"
            marginTop="10px"
            padding={0}
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
          </Container>
        ) : null}
      </Box>
    </Box>
  );
};

export default CommentCard;
