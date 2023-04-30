import { Box, Button, ButtonGroup, HStack, Image } from "@chakra-ui/react";
import { DefaultFeedData } from "pages/main/interface/type";
import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import LikeBtn from "UI/Button/LikeBtn";
import Comment from "./Comment";
import styles from "./FeedDetail.module.scss";

interface FeedDetailContentsProps {
  feedData: DefaultFeedData;
  feedId: string | undefined;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}

function FeedDetailContents({
  feedData,
  feedId,
  scrollRef,
}: FeedDetailContentsProps) {
  return (
    <>
      <div className={styles.feedDetailDiv}>
        <HStack display="flex" flexDirection="column" alignItems="flex-start">
          {feedData?.thumbnail && (
            <Image src={feedData?.thumbnail} margin="20px 0" />
          )}
          <Box>
            <p className={styles.feedTitle}>{feedData.title}</p>
            <p className={styles.feedDescription}>{feedData.description}</p>
          </Box>
        </HStack>
        <ButtonGroup margin="5px 0 5px 0">
          <LikeBtn
            id={feedId}
            likeCount={feedData.like_count}
            isLike={feedData.is_like}
            feedDetail={true}
          />
          <Button
            backgroundColor={"transparent"}
            margin={0}
            padding={2}
            leftIcon={<FiMessageSquare />}
          >
            {feedData.comments_count}
          </Button>
        </ButtonGroup>

        <Comment feedId={feedId} />
        <Box ref={scrollRef} />
      </div>
    </>
  );
}

export default FeedDetailContents;
