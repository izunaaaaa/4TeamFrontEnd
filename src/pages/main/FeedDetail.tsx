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
import "moment/locale/ko";
import useFeedDetail from "./hook/useFeedDetail";

const FeedDetail = (props: any) => {
  const { feedDetail } = useFeedDetail(
    props.feedData.id,
    props.feedData.group.name
  );

  /**작성시간 */
  const writeTime = moment(feedDetail.created_at).fromNow();
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
        <div className={styles.commentDiv}>
          {feedDetail.comment?.map((comment) => {
            const commentWriteTime = moment(comment.created_at).fromNow();

            return (
              <Flex key={comment.id}>
                <Box margin="10px 0 5px 5px">
                  <Avatar
                    name="익명"
                    size="xs"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  />
                </Box>
                <Box padding="10px" lineHeight="5">
                  <p className={styles.commentName}>익명{comment.id}</p>
                  {comment.description}

                  <Flex margin="4px 0 0 0">
                    <p className={styles.commentTime}>{commentWriteTime}</p>
                    <Button
                      backgroundColor={"transparent"}
                      height="20px"
                      padding="0 4px"
                      leftIcon={<FontAwesomeIcon icon={faThumbsUp} />}
                    >
                      {comment.commentlikeCount}
                    </Button>
                    <Button
                      backgroundColor={"transparent"}
                      height="20px"
                      padding="0 1px"
                    >
                      <FontAwesomeIcon icon={faMessage} />
                    </Button>
                    <Button
                      backgroundColor={"transparent"}
                      height="20px"
                      padding="0 1px"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            );
          })}
        </div>
      </div>
      <div className={styles.commentInput}>
        <textarea placeholder="댓글달기" />
        <button>게시</button>
      </div>
    </>
  );
};

export default FeedDetail;
