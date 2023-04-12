import React, { useState } from "react";
import { useFeed } from "../../../pages/main/hook/useFeed";
import styles from "./WrittenPost.module.scss";
import FeedDetail from "components/form/feed/FeedDetail";

type Post = {
  id: number;
  user: string;
  content: string;
  title: string;
};

type FeedData = {
  pages?: {
    results: Post[];
  }[];
  id?: number;
  content?: string;
  user?: {
    username: string;
    name: string;
    email: string;
    avatar: string;
  };
  title?: string;
};

export default function WrittenPost() {
  const { feedData } = useFeed();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (
    Array.isArray(feedData) ||
    !feedData.pages ||
    feedData.pages.length === 0
  ) {
    return <div>데이터가 없습니다.</div>;
  }

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <div className={styles.post}>
        {feedData.pages.map((page: { results: Post[] }) =>
          page.results.map((post: Post) => (
            <div className={styles.post__info} key={post.id}>
              <div
                className={styles.post__content}
                onClick={() => handlePostClick(post)}
              >
                {post.title}
              </div>
            </div>
          ))
        )}
      </div>
      {selectedPost && (
        <div className={styles.modal}>
          <FeedDetail post={selectedPost} onClose={handleCloseModal} />
        </div>
      )}
    </>
  );
}
