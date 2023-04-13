import { Avatar, Box, Button, Flex } from "@chakra-ui/react";
import {
  faMessage,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CommentData } from "interface/Interface";
import React, { useState } from "react";
import styles from "./Comment.module.scss";
import moment from "moment";
import "moment/locale/ko";

const Comment = (props) => {
  // const feedComment: [CommentData] = props.feedComment;
  const feedComment = props.feedComment;

  const [selectComment, setSelectComment] = useState([]);

  console.log(selectComment);

  return (
    <>
      <div>
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
                    onClick={() => {
                      !selectComment.includes(comment.id)
                        ? setSelectComment(() => [comment.id])
                        : setSelectComment(
                            selectComment.filter(
                              (button) => button !== comment.id
                            )
                          );
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
              </Box>
            </Flex>
          );
        })}
      </div>
    </>
  );
};

export default Comment;
