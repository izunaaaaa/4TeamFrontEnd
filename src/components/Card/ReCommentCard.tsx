import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { BsTrash3, BsArrowReturnRight } from "react-icons/bs";
import { FiThumbsUp } from "react-icons/fi";
import useUser from "components/form/User/Hook/useUser";

import moment from "moment";
import "moment/locale/ko";
import { useMutation } from "react-query";
import { deleteRecomment, postCommentLike } from "api/axios/axiosSetting";
import SendBtn from "UI/Button/SendBtn";

const ReCommentCard = (props: any) => {
  const { LoginUserData } = useUser();
  const recomment = props.recomment;
  const index = props.index;
  const commentWriteTime = moment(recomment.created_at).fromNow();
  const toast = useToast();
  const id = "deleteRecomment";
  const successRefetch = props.successRefetch;
  const successPost = props.successPost;

  const [isLike, setIsLike] = useState(recomment.is_like);
  const [likeCount, setLikeCount] = useState(recomment.recommentlikeCount);

  const { mutateAsync: commentLikeHandler } = useMutation(
    (commentData: any) => {
      return postCommentLike(commentData);
    },
    successRefetch
  );

  /**대댓글 삭제 */
  const { mutate: deleteRecommentHandler } = useMutation(
    (recommentData) => deleteRecomment(recommentData),
    {
      onSuccess: () => {
        successPost();
        if (!toast.isActive(id)) {
          toast({ id, title: "대댓글이 삭제되었습니다.", status: "success" });
        }
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

    if (targetValue === "delete") {
      return deleteRecommentHandler(data);
    }
  };

  return (
    <Flex key={index} width="100%">
      <Box lineHeight={5} margin="10px 0 0 12px">
        <BsArrowReturnRight />
      </Box>
      <Flex key={index} width="100%">
        <Box margin="10px">
          <Avatar
            size="xs"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          />
        </Box>
        <Box
          padding="10px 10px 10px 0"
          lineHeight="5"
          width="100%"
          wordBreak="break-all"
        >
          <Flex justifyContent="space-between" marginBottom="2px">
            <Box
              fontWeight="bold"
              color={recomment.feed_writer ? "red.300" : "black"}
            >
              {recomment.anonymous_number}
            </Box>
            <Flex onClick={(e) => btnHandler(e, recomment.pk, "recomment")}>
              <ButtonGroup spacing="-1.5">
                <Button
                  backgroundColor={"transparent"}
                  height="20px"
                  padding="0 4px"
                  value="like"
                >
                  <FiThumbsUp />
                </Button>

                {recomment.user.pk !== LoginUserData.id ? (
                  <SendBtn userPk={recomment.user.pk} height={"20px"} />
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
          <Box fontSize="0.9rem">{recomment.description}</Box>
          <Flex margin="4px 0 0 0">
            <HStack fontSize="0.8rem" spacing="4px">
              <Box>{commentWriteTime}</Box>
              {recomment.commentlikeCount > 0 && (
                <>
                  <FiThumbsUp style={{ color: "red" }} />
                  <Box color="red">{recomment.commentlikeCount}</Box>
                </>
              )}
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ReCommentCard;
