import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./DropDown.module.scss";
import useClickOutside from "./useClickOutside";
import { logout } from "api/axios/axiosSetting";
import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@chakra-ui/react";
import { Querykey } from "api/react-query/QueryKey";

const list = [
  { id: 1, title: "마이페이지", link: "mypage/feedlist" },
  { id: 2, title: "쪽지", link: "letterlist/me" },
  { id: 3, title: "글등록", link: "upload" },
];

function DropDown() {
  const toast = useToast();
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const dropListRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropOpen(!dropOpen);
  };

  useClickOutside(dropListRef, () => {
    setDropOpen(false);
  });

  const queryClient = useQueryClient();

  const { mutateAsync: logoutHandler } = useMutation(() => logout(), {
    onSuccess: async (res) => {
      toast({
        title: "로그아웃 되었습니다.",
        status: "info",
      });

      await queryClient.resetQueries(Querykey.userData);
      navigate("/");
    },
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
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
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
                onClick={() => logoutHandler()}
              >
                <span>로그아웃</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default DropDown;
