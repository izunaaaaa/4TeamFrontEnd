import React, { useState, useEffect } from "react";
import styles from "./Landing.module.scss";
import Login from "components/form/User/Login";
import { useDisclosure } from "@chakra-ui/react";

function Landing() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img
            src="https://velog.velcdn.com/images/view_coding/post/00c25245-11c5-4c63-a30a-fadae29621c7/image.png"
            alt="logo"
          />
        </div>
        <div className={styles.login_btn} onClick={() => onLoginOpen()}>
          커비 즐기기
        </div>
        <Login isOpen={isLoginOpen} onClose={onLoginClose} />
      </div>
      <div className={styles.landing_content}>
        <div className={styles.screen_le}>
          <div className={styles.home}></div>
          <div className={styles.board}></div>
          <div className={styles.timetable}></div>
        </div>
        <div className={styles.screen_ri}>
          <h1>
            우리만의 공간으로 소통하고
            <br />
            다가갈 수 있는 공간
            <br />
            <br />
            <strong>CurB</strong>
          </h1>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <ul>
            {["김두홍", "박현지", "송가연", "이풍현", "임창섭", "최현우"].map(
              (name) => (
                <li key={name}>{name}</li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
export default Landing;
