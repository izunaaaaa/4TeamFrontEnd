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

   useEffect(() => {
      const fetchPosts = async () => {
         // API를 호출하여 새로운 페이지의 게시글 데이터를 가져옴
         const newPosts = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`).then(res => res.json());

         setPosts(prevPosts => [...prevPosts, ...newPosts]);
      };

      fetchPosts();
   }, [page]);

   const handleScroll = () => {
      // 스크롤이 바닥에 닿으면 다음 페이지의 게시글을 가져옴
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
         setPage(prevPage => prevPage + 1);
      }
   };

   useEffect(() => {
      // 스크롤 이벤트 리스너 등록
      window.addEventListener('scroll', handleScroll);

      // 언마운트 시 스크롤 이벤트 리스너 해제
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
