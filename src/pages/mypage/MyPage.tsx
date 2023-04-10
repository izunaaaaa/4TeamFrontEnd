import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faMessage, faThumbsUp, faUser } from '@fortawesome/free-regular-svg-icons';
import styles from './MyPage.module.scss';
import WrittenPost from '../../components/mypages/tabMenu/WrittenPost';
import WrittenComment from '../../components/mypages/tabMenu/WrittenComment';
import CommentedPost from '../../components/mypages/tabMenu/CommentedPost';
import LikedPost from '../../components/mypages/tabMenu/LikedPost';

import Profile from '../../components/mypages/myProfile/Profiles';

export default function MyPage() {
   const [activeTab, setActiveTab] = useState('');

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
      ) : activeTab === 'profile' ? (
         <Profile />
      ) : null;

   return (
      <>
         <div className={styles.container}>
            <div className={styles.tabMenu}>
               <ul className={styles.list}>
                  <li className={styles.item}>
                     <Link to='/mypage/written' onClick={() => handleTab('written')} className={activeTab === 'written' ? styles.active : ''}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <p>작성 글</p>
                     </Link>
                  </li>
                  <li className={styles.item}>
                     <Link to='/mypage/comments' onClick={() => handleTab('myComments')} className={activeTab === 'myComments' ? styles.active : ''}>
                        <FontAwesomeIcon icon={faMessage} size='lg' />
                        <p>댓글단 글</p>
                     </Link>
                  </li>
                  <li className={styles.item}>
                     <Link to='/mypage/likes' onClick={() => handleTab('myLikes')} className={activeTab === 'myLikes' ? styles.active : ''}>
                        <FontAwesomeIcon icon={faThumbsUp} size='lg' />
                        <p>좋아요한 글</p>
                     </Link>
                  </li>
                  <li className={styles.item}>
                     <Link to='/mypage/profile' onClick={() => handleTab('profile')} className={activeTab === 'profile' ? styles.active : ''}>
                        <FontAwesomeIcon icon={faUser} size='lg' />
                        <p>내정보</p>
                     </Link>
                  </li>
               </ul>
            </div>
            {activeContent}
         </div>
      </>
   );
}
