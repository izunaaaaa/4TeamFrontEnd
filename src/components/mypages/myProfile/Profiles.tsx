import React, { useState } from 'react';
import axios from 'axios';
import styles from './Profiles.module.scss';

const Profile = () => {
   const [userInfo, setUserInfo] = useState({
      profileImg: '',
      username: '',
      birthdate: '',
      bio: '',
      email: '',
      phone: '',
      gender: '',
      password: '',
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setUserInfo(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         const res = await axios.post('/api/user', userInfo);
         console.log(res.data);
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div className={styles.my__profile}>
         <form onSubmit={handleSubmit}>
            <div className={styles.form__group}>
               <label htmlFor='profileImg'>프로필 사진을 올려주세요</label>
               <input type='file' accept='image/*' name='file' onChange={handleChange} />
            </div>
            <div className={styles.form__group}>
               <label htmlFor='username'>사용자 이름</label>
               <input type='text' id='username' name='username' value={userInfo.username} onChange={handleChange} />
            </div>
            <div className={styles.form__group}>
               <label htmlFor='birthdate'>생년월일</label>
               <input type='date' id='birthdate' name='birthdate' value={userInfo.birthdate} onChange={handleChange} />
            </div>
            <div className={styles.form__group}>
               <label htmlFor='bio'>소개</label>
               <textarea id='bio' name='bio' value={userInfo.bio} onChange={handleChange} />
            </div>
            <div className={styles.form__group}>
               <label htmlFor='email'>이메일</label>
               <div className={styles.email__input}>
                  <input type='text' id='email' name='email' value={userInfo.email} onChange={handleChange} placeholder='email' />
                  <select id='emailDomain' name='emailDomain' onChange={handleChange}>
                     <option value=''>이메일 선택</option>
                     <option value='naver.com'>naver.com</option>
                     <option value='gmail.com'>gmail.com</option>
                     <option value='hanmail.net'>hanmail.net</option>
                     <option value='daum.net'>daum.net</option>
                  </select>
               </div>
            </div>
            <div className={styles.form__group}>
               <label htmlFor='phone'>전화번호</label>
               <input type='tel' id='phone' name='phone' value={userInfo.phone} onChange={handleChange} />
            </div>
            <div className={styles.form__group}>
               <label htmlFor='gender'>성별</label>
               <select id='gender' name='gender' value={userInfo.gender} onChange={handleChange}>
                  <option value=''>선택하세요</option>
                  <option value='male'>남성</option>
                  <option value='female'>여성</option>
               </select>
            </div>
            <div className={styles.form__group}>
               <label htmlFor='password'>비밀번호 변경</label>
               <input type='password' id='password' name='password' value={userInfo.password} onChange={handleChange} />
            </div>
            <button type='submit'>저장</button>
         </form>
      </div>
   );
};

export default Profile;
