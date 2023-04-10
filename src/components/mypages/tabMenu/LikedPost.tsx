import React from 'react';
import { Link } from 'react-router-dom';

export default function LikedPost() {
   type Post = {
      id: number;
      title: string;
      date: string;
      views: number;
   };

   const posts: Post[] = [
      { id: 1, title: '첫 번째 게시글', date: '2023-03-01', views: 10 },
      { id: 2, title: '두 번째 게시글', date: '2023-03-02', views: 22 },
      { id: 3, title: '세 번째 게시글', date: '2023-03-03', views: 16 },
   ];
   return (
      <>
         {/* api
      1. 좋아요 수,
      2. 조회 수
      
      */}
         <>
            <div>
               <table>
                  <thead>
                     <tr>
                        <th>선택</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>조회수</th>
                     </tr>
                  </thead>
                  <tbody>
                     {posts.map(post => (
                        <tr key={post.id}>
                           <td>
                              <input type='checkbox' />
                           </td>
                           <td>
                              <Link to={`/posts/${post.id}`}>{post.title}</Link>
                           </td>
                           <td>{post.date}</td>
                           <td>{post.views}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </>
      </>
   );
}
