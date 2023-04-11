import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./DropDown.module.scss";
import { ListItem } from "../interface/Interface";

const list: ListItem[] = [
  { id: 1, title: "마이페이지" },
  { id: 2, title: "쪽지" },
  { id: 3, title: "글등록" },
  { id: 4, title: "로그인" },
];

function DropDown() {
  return (
    <>
      <ul className={styles.drop_list}>
        {list.map((item) => (
          <li className={styles.drop_listItem} key={item.id}>
            <Link to={"/"}>
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DropDown;

// 추가
