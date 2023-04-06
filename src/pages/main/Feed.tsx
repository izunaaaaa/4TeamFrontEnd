import Comment from "./Comment";
import { useFeed } from "./hook/useFeed";
import styles from "./Feed.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

function Feed() {
  const feedData = useFeed();
  const [isClickLike, setIsClickLike] = useState(false);

  /**추천 클릭시 이벤트 */
  const thumbClickHandler = (e: any) => {
    console.log(e.target);
    setIsClickLike(!isClickLike);
  };

  return (
    <>
      {feedData?.map((data) => (
        <div key={data.id} className={styles.feedDiv}>
          <h2 className={styles.feedUser}>{data.user}</h2>
          <img src={data.medias[0]} alt="" />
          <div>
            <button key={data.id} onClick={thumbClickHandler}>
              {!isClickLike ? (
                <FontAwesomeIcon icon={faThumbsUp} size="2x" />
              ) : (
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  size="2x"
                  style={{ color: "red" }}
                />
              )}
            </button>
            <button>
              <FontAwesomeIcon icon={faMessage} size="2x" />
            </button>
          </div>

          <p>{data.description}</p>
        </div>
      ))}
      <Comment />
    </>
  );
}

export default Feed;
