import { Avatar } from "@chakra-ui/react";
import React from "react";
import styles from "./FeedDetail.module.scss";

const FeedDetail = () => {
  return (
    <div className={styles.feedDetailDiv}>
      <div className={styles.nickName}>
        <Avatar name="닉네임" size="xs" />
        <p>username</p>
      </div>
      <img
        alt=""
        src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
      />
      <div>comment</div>
      <div className={styles.commentInput}>
        <textarea placeholder="댓글달기" />
        <button>게시</button>
      </div>
    </div>
  );
};

export default FeedDetail;
