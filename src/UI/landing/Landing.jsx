import React, { useState, useEffect } from 'react';
import styles from './Landing.module.scss';
import { FaUserCircle, FaSignInAlt, FaRunning } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Landing() {
   const [currentSlide, setCurrentSlide] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentSlide(prevSlide => (prevSlide + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
   }, []);

   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isHovered, setIsHovered] = useState(false);

   return (
      <div className={styles.container}>
         <header className={styles.header}>
            <div className={styles.logo}>
               <h1>CurB</h1>
            </div>

            <div className={styles.login__icon} onClick={() => setIsLoggedIn(true)}>
               <Link to='/'>
                  <FaSignInAlt className={styles.hover} />
               </Link>
            </div>

            {/* login 했을 경우 보여주게 */}
            {/* <div className={styles.user__icon}>
               <FaUserCircle />
            </div> */}
         </header>
         <section className={styles.wrapper}>
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
         <section>{/* landing page or s */}</section>
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
