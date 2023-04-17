import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./DropDown.module.scss";
import Login from "components/form/User/Login";

const list = [
  { id: 1, title: "마이페이지", link: "/mypage" },
  { id: 2, title: "쪽지", link: "/mypage" },
  { id: 3, title: "글등록", link: "/mypage" },
];

function DropDown() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <>
      <ul className={styles.drop_list}>
        {list.map((item) => (
          <li className={styles.drop_listItem} key={item.id}>
            <Link to={item.link}>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
        <li className={styles.drop_listItem} onClick={handleLogin}>
          <span>로그인</span>
        </li>
      </ul>
      <Login isOpen={isLoginOpen} onClose={handleLogin} />
    </>
  );
}

export default DropDown;
