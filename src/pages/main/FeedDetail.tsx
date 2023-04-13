import { Avatar, Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import {
  faHeart,
  faMessage,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FeedDetail.module.scss";
import moment from "moment";
import useFeedDetail from "./hook/useFeedDetail";
import Comment from "./Comment";
import "moment/locale/ko";

const FeedDetail = (props: any) => {
  const { feedDetail } = useFeedDetail(
    props.feedData.id,
    props.feedData.group.name
  );

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
    console.log(data);
  };
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
        <img
          alt=""
          src="https://img.hani.co.kr/imgdb/original/2007/1227/68227042_20071227.jpg"
        />
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
      <div className={styles.commentInput}>
        <textarea placeholder="댓글달기" />
        <button>게시</button>
      </div>
    </>
  );
};

export default FeedDetail;
