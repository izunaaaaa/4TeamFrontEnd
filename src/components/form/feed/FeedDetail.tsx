import { Avatar } from "@chakra-ui/react";
import { faMessage, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./FeedDetail.module.scss";

const FeedDetail = (props: any) => {
  console.log(props.feedData);
  return (
    <div className={styles.feedDetailDiv}>
      <div className={styles.nickName}>
        <Avatar name="닉네임" size="xs" />
        <p>{props.feedData.user}</p>
      </div>
      <img alt="" src={props.feedData.medias[0]} />
      <div className={styles.commentDiv}>
        {props.feedData.comment.map((comment: any) => {
          return (
            <li key={comment.id}>
              <p>
                <Avatar name={comment.user} size="xs" />
                &nbsp;&nbsp;
                {comment.user} &nbsp;&nbsp;{comment.description}
                <div className={styles.commentBtn}>
                  <button>
                    <FontAwesomeIcon icon={faMessage} />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </p>
            </li>
          );
        })}
      </div>
      <div className={styles.commentInput}>
        <textarea placeholder="댓글달기" />
        <button>게시</button>
      </div>
    </div>
  );
};

export default FeedDetail;
