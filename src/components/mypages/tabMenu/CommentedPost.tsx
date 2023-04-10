import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MyPage.module.scss';
export default function CommentedPost() {
   type Post = {
      id: number;
      title: string;
      date: string;
      views: number;
   };

   const posts: Post[] = [
      { id: 1, title: '첫 번째 ', date: '2023-03-01', views: 10 },
      { id: 2, title: '두 번째 ', date: '2023-03-02', views: 22 },
      { id: 3, title: '세 번째 ', date: '2023-03-03', views: 16 },
   ];
   return <></>;
}
