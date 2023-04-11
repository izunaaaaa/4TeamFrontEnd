import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faMessage, faThumbsUp, faUser } from '@fortawesome/free-regular-svg-icons';
import styles from './MyPage.module.scss';
import TabMenuItem from 'components/mypages/tabMenu/TabMenuItem';
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
                  <TabMenuItem icon={faPenToSquare} size='lg' text='작성 글' tabName='written' activeTab={activeTab} onClick={handleTab} />
                  <TabMenuItem icon={faMessage} size='lg' text='댓글단 글' tabName='writtencomment' activeTab={activeTab} onClick={handleTab} />
                  <TabMenuItem icon={faThumbsUp} size='lg' text='좋아요한 글' tabName='myLikes' activeTab={activeTab} onClick={handleTab} />
                  <TabMenuItem icon={faUser} size='lg' text='내정보' tabName='profile' activeTab={activeTab} onClick={handleTab} />
               </ul>
            </div>
            {activeContent}
         </div>
      </>
   );
}
