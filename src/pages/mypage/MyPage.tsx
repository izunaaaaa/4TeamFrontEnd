import React, { useState } from 'react';
import { faPenToSquare, faMessage, faThumbsUp, faUser } from '@fortawesome/free-regular-svg-icons';
import styles from './MyPage.module.scss';
import TabMenuItem from '../../components/mypages/tabMenu/TabMenuItem';
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
      ) : activeTab === 'comments' ? (
         <CommentedPost />
      ) : activeTab === 'likes' ? (
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
                  <TabMenuItem icon={faMessage} size='lg' text='작성 댓글' tabName='writtencomment' activeTab={activeTab} onClick={handleTab} />
                  <TabMenuItem icon={faThumbsUp} size='lg' text='좋아요한 글' tabName='likes' activeTab={activeTab} onClick={handleTab} />
                  <TabMenuItem icon={faUser} size='lg' text='내 정보' tabName='profile' activeTab={activeTab} onClick={handleTab} />
               </ul>
            </div>
            {activeContent}
         </div>
      </>
   );
}
