import React, { useState, useEffect } from 'react';
import styles from './Main.module.scss';

export default function Landing() {
   const [currentSlide, setCurrentSlide] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentSlide(prevSlide => (prevSlide + 1) % 4);
      }, 1000);
      return () => clearInterval(interval);
   }, []);

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <div className={styles.monitor}>
               <img
                  alt='Slide1'
                  src='https://source.unsplash.com/random/1600x900/?nature'
                  className={`${styles.slide} ${currentSlide === 0 ? styles.active : ''}`}
               />
               <img
                  alt='Slide2'
                  src='https://source.unsplash.com/random/1600x900/?water'
                  className={`${styles.slide} ${currentSlide === 1 ? styles.active : ''}`}
               />
               <img
                  alt='Slide3'
                  src='https://source.unsplash.com/random/1600x900/?mountain'
                  className={`${styles.slide} ${currentSlide === 2 ? styles.active : ''}`}
               />
               <img
                  alt='Slide4'
                  src='https://source.unsplash.com/random/1600x900/?landscape'
                  className={`${styles.slide} ${currentSlide === 3 ? styles.active : ''}`}
               />
            </div>
            <div className={styles.mobile}>
               <img
                  alt='Slide1'
                  src='https://source.unsplash.com/random/800x1200/?nature'
                  className={`${styles.slide} ${currentSlide === 0 ? styles.active : ''}`}
               />
               <img
                  alt='Slide2'
                  src='https://source.unsplash.com/random/800x1200/?water'
                  className={`${styles.slide} ${currentSlide === 1 ? styles.active : ''}`}
               />
               <img
                  alt='Slide3'
                  src='https://source.unsplash.com/random/800x1200/?mountain'
                  className={`${styles.slide} ${currentSlide === 2 ? styles.active : ''}`}
               />
               <img
                  alt='Slide4'
                  src='https://source.unsplash.com/random/800x1200/?landscape'
                  className={`${styles.slide} ${currentSlide === 3 ? styles.active : ''}`}
               />
            </div>
         </div>
      </div>
   );
}
