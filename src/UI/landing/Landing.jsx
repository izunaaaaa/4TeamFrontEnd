import React, { useState, useEffect } from "react";
import styles from "./Landing.module.scss";
import { FaUserCircle, FaSignInAlt, FaRunning } from "react-icons/fa";
import { Link } from "react-router-dom";
import Login from "components/form/User/Login";
import { useDisclosure } from "@chakra-ui/react";

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

   const [isLoggedIn, setIsLoggedIn] = useState(false);

   return (
      <div className={styles.container}>
         {/* header */}
         <header className={styles.header}>
            <div className={styles.logo}>
               <h1>CurB</h1>
            </div>

            <div className={styles.login__icon} onClick={() => setIsLoggedIn(true)}>
               <Link to='/login'>
                  <FaSignInAlt className={styles.hover} />
               </Link>
            </div>
         </header>

         {/* 1번째 섹션*/}
         <section className={styles.wrapper}>
            {/* 현재는 랜덤이미지로 보여기제 하였지만,
            현재 커뮤니티 작업물을 스크린샷을 찍어 이미지를 만든다음 배열로 감싸 넣어서 배열로 뿌려주면 됩니다.
            다른 더 좋은 방법이 있을껀데.. 있다면 더 좋은 방법을 채택하면 좋을 것 같습니다.
          */}
            <div className={styles.monitor}>
               {[...Array(4)].map((_, index) => (
                  <img
                     key={index}
                     alt={`Slide${index + 1}`}
                     src={`https://source.unsplash.com/random/1600x900/?${['nature', 'water', 'mountain', 'landscape'][index]}`}
                     className={`${styles.slide} ${currentSlide === index ? styles.active : ''}`}
                  />
               ))}
               <div className={styles.mobile}>
                  {[...Array(4)].map((_, index) => (
                     <img
                        key={index}
                        alt={`Slide${index + 1}`}
                        src={`https://source.unsplash.com/random/800x1200/?${['nature', 'water', 'mountain', 'landscape'][index]}`}
                        className={`${styles.slide} ${currentSlide === index ? styles.active : ''}`}
                     />
                  ))}
               </div>
            </div>
         </section>

         {/* 2번째 섹션 */}
         <section></section>
         <footer className={styles.footer}>
            <div className={styles.footerContent}>
               <h3>CurB</h3>
               <ul>
                  {['김두홍', '박현지', '송가연', '이풍현', '임창섭', '최현우'].map(name => (
                     <li key={name}>{name}</li>
                  ))}
               </ul>
            </div>
         </footer>
      </div>
   );
}
