import React, { useState, useEffect } from 'react';
import styles from './WrittenPost.module.scss';

const PAGE_SIZE = 20; // 한 번에 보여줄 게시글 수
const TOTAL_PAGES = 25; // 전체 페이지 수

type Post = {
   id: number;
   user?: string;
   content?: string;
   title: string;
};

export default function WrittenPost(): JSX.Element {
   const [page, setPage] = useState<number>(1);
   const [posts, setPosts] = useState<Post[]>([]);

   // 더미테스트
   useEffect(() => {
      const fetchPosts = async () => {
         const newPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`).then(res => res.json());

         setPosts(prevPosts => [...prevPosts, ...newPosts]);
      };

      fetchPosts();
   }, [page]);

   const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
         setPage(prevPage => prevPage + 1);
      }
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <div className={styles.post}>
         {posts.map((post: Post) => (
            <div className={styles.post__info} key={post.id}>
               <div className={styles.post__content}>{post.title}</div>
            </div>
         ))}
      </div>
   );
}
