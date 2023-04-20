import { Avatar, Box, Button, Flex, HStack } from "@chakra-ui/react";
import {
  faArrowTurnUp,
  faEllipsis,
  faMessage,
  faPaperPlane,
  faThumbsUp,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import styles from "./Comment.module.scss";
import moment from "moment";
import "moment/locale/ko";
import { useMutation } from "react-query";
import { postRecomment } from "api/axios/axiosSetting";
import useUser from "components/form/User/Hook/useUser";

const Comment = (props) => {
  const feedComment = props.feedComment;
  const { LoginUserData } = useUser();
  const selectCommentRef = useRef([]);

  // console.log(selectCommentRef.current);

  console.log(LoginUserData.username, feedComment);
  const { mutation: postRecommentHandler } = useMutation(() => postRecomment());

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
                <Flex>
                  <Button
                    backgroundColor={"transparent"}
                    height="20px"
                    padding="0 4px"
                  >
                    <FontAwesomeIcon icon={faThumbsUp} />
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
              <HStack marginTop="2px" fontSize="0.8rem" spacing="2px">
                <Box>{commentWriteTime}</Box>
                {comment.commentlikeCount > 0 && (
                  <>
                    <FontAwesomeIcon icon={faThumbsUp} size="xs" />
                    <Box>{comment.commentlikeCount}</Box>
                  </>
                )}
              </HStack>
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
