import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postComment } from "api/axios/axiosSetting";

const FeedDetail = (props: any) => {
  const feedData = props.feedData;
  const { feedDetail, isLoading, refetch } = useFeedDetail(feedData.id);
  const { register, handleSubmit, reset } = useForm();

  /**댓글달기 */
  const { mutateAsync: commentSubmitHandler, isLoading: commentLoading } =
    useMutation((comment: any) => postComment(feedData.id, comment), {
      onSuccess: () => {
        refetch();
      },
    });

  const commentSubmit = async (data: any) => {
    await commentSubmitHandler(data);
    reset();
  };

  const [recommentId, setRecommentId] = useState("");

  /**중복되는 username을 가진 comment 객체의 id 값을 저장할 Map 생성 */
  const idMap = new Map();
  const uniqueComments = feedDetail?.comment?.map((comment: any) => {
    if (!idMap.has(comment.user.username)) {
      /**username이 Map에 없으면 id를 부여하고 Map에 추가*/
      idMap.set(comment.user.username, comment.id);
      return comment;
    } else {
      /**username이 Map에 있으면 이미 부여된 id를 사용 */
      return { ...comment, id: idMap.get(comment.user.username) };
    }
  });

  /**작성시간 */
  const writeTime = moment(feedDetail.created_at).fromNow();
  /**대댓글 */
  const recomment = (data: any) => {
    setRecommentId(data[0].id);
  };

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
        <Image src={feedDetail?.images[0]?.url} />
        <ButtonGroup margin="5px 0 5px 0">
          <Button
            backgroundColor={"transparent"}
            margin={0}
            padding={2}
            leftIcon={<FontAwesomeIcon icon={faThumbsUp} size="lg" />}
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
        <Box margin="5px 2px 40px 2px">{feedDetail.description}</Box>
        <Comment feedComment={uniqueComments} recomment={recomment} />
      </div>
      <form
        className={styles.commentInput}
        onSubmit={handleSubmit(commentSubmit)}
      >
        <textarea
          placeholder="댓글달기"
          defaultValue={recommentId ? `익명${recommentId}` : ""}
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
