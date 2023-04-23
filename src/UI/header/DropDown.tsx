import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./DropDown.module.scss";
import Login from "components/form/User/Login";
import useClickOutside from "./useClickOutside";
import { useDisclosure } from "@chakra-ui/react";

const list = [
  { id: 1, title: "마이페이지", link: "/mypage" },
  { id: 2, title: "쪽지", link: "/chattings" },
  { id: 3, title: "글등록", link: "/upload" },
];

function DropDown() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const dropListRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropOpen(!dropOpen);
  };

  useClickOutside(dropListRef, () => {
    setDropOpen(false);
  });

  return (
    <>
      <div
        className={styles.fofile_box}
        onClick={toggleDropdown}
        ref={dropListRef}
      >
        <div className={styles.myFrofile}>
          <img
            src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
            alt="fofile"
          ></img>
        </div>
        {dropOpen && (
          <div className={styles.dropList}>
            <ul className={styles.drop_list}>
              {list.map((item) => (
                <li className={styles.drop_listItem} key={item.id}>
                  <Link to={item.link}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
              <li
                className={styles.drop_listItem}
                onClick={() => onLoginOpen()}
              >
                <span>로그인</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      <Login isOpen={isLoginOpen} onClose={onLoginClose} />
    </>
  );
}

export default DropDown;
