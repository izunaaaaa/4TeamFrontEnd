import React, { useState } from 'react';
import { useFeed } from '../../../pages/main/hook/useFeed';
import styles from './WrittenPost.module.scss';

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
   results?: Post[];
};

export default function WrittenPost() {
   const { feedData } = useFeed();
   const [selectedPost, setSelectedPost] = useState<Post | null>(null);

   if (!feedData?.pages?.length) return <div>데이터가 없습니다.</div>;

   const handlePostClick = (post: Post) => setSelectedPost(post);
   const handleCloseModal = () => setSelectedPost(null);

   return (
      <>
         <div className={styles.post}>
            {feedData.pages.map((page: FeedData) =>
               page.results?.slice(0, 3).map((post: Post) => (
                  <div className={styles.post__info} key={post.id}>
                     <div className={styles.post__content} onClick={() => handlePostClick(post)}>
                        {post.title}
                     </div>
                  </div>
               )),
            )}
         </div>
         {selectedPost && <div className={styles.modal}></div>}
      </>
   );
}
