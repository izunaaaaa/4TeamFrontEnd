import { Button, Flex, Input, useToast } from "@chakra-ui/react";
import styles from "./Comment.module.scss";
import moment from "moment";
import "moment/locale/ko";
import { useMutation, useQueryClient } from "react-query";
import { postRecomment } from "api/axios/axiosSetting";
import useUser from "components/form/User/Hook/useUser";
import useComment from "./hook/useComment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Querykey } from "api/react-query/QueryKey";
import CommentCard from "components/Card/CommentCard";
import ReCommentCard from "components/Card/ReCommentCard";

const Comment = (props) => {
  const feedId = props.feedId;
  const { register, handleSubmit, reset } = useForm();
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

  return (
    <>
      {feedComment?.map((comment, index) => {
        return (
          <Flex key={index} width="100%" flexDir="column">
            <CommentCard
              key={index}
              comment={comment}
              index={index}
              successRefetch={successRefetch}
              successPost={successPost}
            />

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
              <ReCommentCard
                key={index}
                recomment={recomment}
                index={index}
                successRefetch={successRefetch}
                successPost={successPost}
              />
            ))}
          </Flex>
        );
      })}
    </>
  );
};

export default Comment;
