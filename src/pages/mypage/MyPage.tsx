import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MyPage.module.scss';
import WrittenPost from '../../components/mypages/tabMenu/WrittenPost';
import WrittenComment from '../../components/mypages/tabMenu/WrittenComment';
import CommentedPost from '../../components/mypages/tabMenu/CommentedPost';
import LikedPost from '../../components/mypages/tabMenu/LikedPost';
import DeletedPost from '../../components/mypages/tabMenu/DeletedPost';
import Profiles from '../../components/mypages/myProfile/Profiles';

export default function MyPage() {
   const [activeTab, setActiveTab] = useState('written');

   const handleTab = (tab: string) => {
      setActiveTab(tab);
   };

   const activeContent =
      activeTab === 'written' ? (
         <WrittenPost />
      ) : activeTab === 'writtencomment' ? (
         <WrittenComment />
      ) : activeTab === 'myComments' ? (
         <CommentedPost />
      ) : activeTab === 'myLikes' ? (
         <LikedPost />
      ) : activeTab === 'mydelete' ? (
         <DeletedPost />
      ) : activeTab === 'profiles' ? (
         <Profiles />
      ) : null;

   return (
      <>
         <div className={styles.container}>
            <div className={styles.user}>
               <Link to='/mypage/profiles' onClick={() => handleTab('written')} className={activeTab === 'written' ? styles.active : ''}>
                  <p>내정보</p>
               </Link>
            </div>

            <div className={styles.tabMenu}>
               <ul className={styles.list}>
                  <li className={styles.item}>
                     <Link to='/mypage/written' onClick={() => handleTab('written')} className={activeTab === 'written' ? styles.active : ''}>
                        <p>작성 글</p>
                     </Link>
                  </li>
                  <li className={styles.item}>
                     <Link
                        to='/mypage/writtencomment'
                        onClick={() => handleTab('writtencomment')}
                        className={activeTab === 'writtencomment' ? styles.active : ''}
                     >
                        <p>작성단 글</p>
                     </Link>
                  </li>
                  <li className={styles.item}>
                     <Link to='/mypage/comments' onClick={() => handleTab('myComments')} className={activeTab === 'myComments' ? styles.active : ''}>
                        <p>댓글단 글</p>
                     </Link>
                  </li>
                  <li className={styles.item}>
                     <Link to='/mypage/likes' onClick={() => handleTab('myLikes')} className={activeTab === 'myLikes' ? styles.active : ''}>
                        <p>좋아요한 글</p>
                     </Link>
                  </li>
                  <li className={styles.item}>
                     <Link to='/mypage/writtendelete' onClick={() => handleTab('mydelete')} className={activeTab === 'mydelete' ? styles.active : ''}>
                        <p>삭제한 글</p>
                     </Link>
                  </li>
               </ul>
            </div>
            {activeContent}
         </div>
      </>
   );
}
