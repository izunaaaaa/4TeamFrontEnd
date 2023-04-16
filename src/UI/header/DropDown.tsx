import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./DropDown.module.scss";
import { ListItem } from "interface/Interface";
import { useDisclosure } from "@chakra-ui/react";
import Login from "components/form/User/Login";

const list: ListItem[] = [
  { id: 1, title: "마이페이지", link: "/mypage" },
  { id: 2, title: "쪽지", link: "#" },
  { id: 3, title: "글등록", link: "#" },
  { id: 4, title: "로그인", link: "#" },
];

function DropDown() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  const handleLoginClick = () => {
    onLoginOpen();
  };

  return (
    <>
      <ul className={styles.drop_list}>
        {list.map((item) => (
          <li
            className={styles.drop_listItem}
            key={item.id}
            onClick={item.title === "로그인" ? handleLoginClick : undefined}
          >
            <Link to={"#"}>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Login isOpen={isLoginOpen} onClose={onLoginClose} />
    </>
  );
}

export default DropDown;
