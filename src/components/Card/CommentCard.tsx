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
import { CommentType, Description } from "pages/main/interface/type";

interface CommentCardProps {
  comment: CommentType;
  successRefetch: object;
  successPost: Function;
}

export interface ClickBtnData {
  id: number;
  commentType: string;
}

function CommentCard({
  comment,
  successPost,
  successRefetch,
}: CommentCardProps) {
  const { LoginUserData } = useUser();
  const { feedId } = useParams();

  const { register, handleSubmit, reset } = useForm<Description>();
  const toast = useToast();
  const id = "delteToast";

  const [isOpenRecommentInput, setIsOpenRecommentInput] = useState(false);
  const [isLike, setIsLike] = useState(comment.is_like);
  const [likeCount, setLikeCount] = useState(comment.commentlikeCount);

  /**댓글 좋아요 */
  const { mutateAsync: commentLikeHandler } = useMutation(
    (commentData: ClickBtnData) => {
      return postCommentLike(commentData);
    },
    successRefetch
  );

  /**댓글 삭제 */
  const { mutate: deleteCommentHandler } = useMutation(
    (data: ClickBtnData) => deleteComment(data),
    {
      onSuccess: () => {
        successPost();
        if (!toast.isActive(id)) {
          toast({
            id,
            title: "댓글이 삭제되었습니다.",
            status: "success",
          });
        }
      },
    }
  );

  /**대댓글 달기 */
  const { mutateAsync: postRecommentHandler, isLoading } = useMutation(
    (description: Description) =>
      postRecomment(feedId, comment.id, description),
    {
      onSuccess: () => {
        successPost();
      },
    }
  );
  const submitRecommentHandler = async (description: Description) => {
    await postRecommentHandler(description);
    reset();
  };

  /**댓글 버튼 이벤트 */
  const btnHandler = async (
    e: React.MouseEvent,
    id: number,
    commentType: string
  ) => {
    const eventTarget = e.target as HTMLButtonElement;
    const targetValue = eventTarget.value;
    const data: ClickBtnData = {
      id,
      commentType,
    };

    console.log(targetValue);
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
      return deleteCommentHandler(data);
    }
  };

  const commentWriteTime = moment(comment.created_at).fromNow();

  return (
    <Box width="100%" display="flex" key={comment.id}>
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
            {comment.feed_writer ? `글쓴이` : `익명${comment.id + 1}`}
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
                onClick={() => setIsOpenRecommentInput(!isOpenRecommentInput)}
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
        <Box fontSize="0.9rem">{comment.description}</Box>
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
}

export default CommentCard;
