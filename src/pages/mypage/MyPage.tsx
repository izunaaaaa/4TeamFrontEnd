import React, { useEffect, useRef, useState } from 'react';
import { faPenToSquare, faMessage, faThumbsUp, faUser } from '@fortawesome/free-regular-svg-icons';
import styles from './MyPage.module.scss';
import TabMenuItem from '../../components/mypages/tabMenu/TabMenuItem';
import WrittenPost from '../../components/mypages/tabMenu/WrittenPost';
import WrittenComment from '../../components/mypages/tabMenu/WrittenComment';
import LikedPost from '../../components/mypages/tabMenu/LikedPost';
import Profile from '../../components/mypages/myProfile/Profiles';

export default function MyPage() {
   const [activeTab, setActiveTab] = useState('');
   const [isScrolled, setIsScrolled] = useState(false);
   const [isTabMenuFixed, setIsTabMenuFixed] = useState(false);

   const handleTab = (tab: string) => {
      setActiveTab(tab);
   };

   const activeContent =
      activeTab === 'written' ? (
         <WrittenPost />
      ) : activeTab === 'writtencomment' ? (
         <WrittenComment />
      ) : activeTab === 'likes' ? (
         <LikedPost />
      ) : activeTab === 'profile' ? (
         <Profile />
      ) : null;

   const activeContentRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleScroll = () => {
         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
         const activeContentHeight = activeContentRef.current?.clientHeight || 0;
         setIsScrolled(scrollTop > 0);

         if (activeContentRef.current && scrollTop >= activeContentRef.current.offsetTop - activeContentHeight) {
            setIsTabMenuFixed(true);
         } else {
            setIsTabMenuFixed(false);
         }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return (
      <>
         <div className={`${styles.container} ${!activeContent && styles.no__content}`}>
            <div className={`${styles.tabMenu} ${isScrolled ? styles.scrolled : ''} ${isTabMenuFixed ? styles.fixed : ''}`}>
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
