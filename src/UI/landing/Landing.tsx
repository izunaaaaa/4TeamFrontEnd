import styles from "./Landing.module.scss";
import Login from "components/form/User/Login";
import { useDisclosure } from "@chakra-ui/react";
import useUser from "components/form/User/Hook/useUser";
import { useNavigate } from "react-router-dom";

function Landing() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const { LoginUserData } = useUser();
  const navigate = useNavigate();

  if (LoginUserData) {
    navigate("/community/home");
  }

  return (
    <div className={styles.landingHome}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img
            src="https://velog.velcdn.com/images/view_coding/post/ae532678-7a1e-4916-95d1-86b330f60f11/image.png"
            alt="logo"
          />
        </div>
        <div className={styles.login_btn} onClick={() => onLoginOpen()}>
          <h1>커비 즐기기</h1>
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
            {["김두홍", "박현지", "송가연", "이풍현", "최현우"].map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Landing;
