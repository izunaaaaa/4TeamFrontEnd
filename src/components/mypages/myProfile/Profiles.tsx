import React, { useState } from 'react';
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

   const [uploadedImg, setUploadedImg] = useState('');

   const handleImageChange = (e: any) => {
      const file = e.target.files[0];
      const uploadedImg = URL.createObjectURL(file);
      setUploadedImg(uploadedImg);
   };

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setUserInfo(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // 이미지 업로드 및 프로필 사진 변경 코드
   };
   return (
      <div className={styles.my__profile}>
         <form onSubmit={handleSubmit}>
            <div className={styles.form__group}>
               <label htmlFor='profileImg' className={styles.profile__img__label}>
                  <div className={styles.profile__img__wrapper}>
                     <div className={styles.profile__img__preview}>
                        {uploadedImg || userInfo.profileImg ? (
                           <img src={uploadedImg || userInfo.profileImg} alt='Profile' />
                        ) : (
                           <div className={styles.profile__img__empty}></div>
                        )}
                     </div>
                     <div className={styles.profile__img__change}>
                        <span>프로필 사진 변경</span>
                     </div>
                  </div>
               </label>
               <input type='file' accept='image/*' name='file' id='profileImg' onChange={handleImageChange} style={{ display: 'none' }} multiple={false} />
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
                  @&nbsp;
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
