import { Avatar, Box, Button, Flex } from "@chakra-ui/react";
import {
  faArrowTurnUp,
  faMessage,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommentData } from "interface/Interface";
import React, { useRef, useState } from "react";
import styles from "./Comment.module.scss";
import moment from "moment";
import "moment/locale/ko";

const Comment = (props) => {
  // const feedComment: [CommentData] = props.feedComment;
  const feedComment = props.feedComment;

  const selectCommentRef = useRef([]);
  // const [selectComment, setSelectComment] = useState([]);

  return (
    <>
      {feedComment?.map((comment, index) => {
        const commentWriteTime = moment(comment.created_at).fromNow();
        return (
          <Flex key={index}>
            <Box margin="10px 0 5px 5px">
              <Avatar
                name="익명"
                size="xs"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              />
            </Box>
            <Box padding="7px" lineHeight="5">
              <p className={styles.commentName}>익명{index + 1}</p>
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
                  onClick={() => {
                    !selectCommentRef?.current.includes(comment.id)
                      ? (selectCommentRef.current = [comment])
                      : selectCommentRef.current.filter(
                          (button) => button !== [comment]
                        );

                    props.recomment(selectCommentRef.current);
                  }}
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
                      {recomment.description}
                      <Flex margin="4px 0 0 0">
                        <p className={styles.commentTime}>{commentWriteTime}</p>
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
