import { useEffect, useRef, useState } from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "../interface/Interface";
import { Link } from "react-router-dom";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar({ sidebar, setSidebar }: SidebarProps) {
  // 새로운 채널의 이름을 저장하는 상태 변수
  const [newChannelName, setNewChannelName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sidebarData, setSidebarData] = useState(SidebarData);
  // 관리자 여부를 나타내는 상태
  const [isAdmin, setIsAdmin] = useState(true);

  const handleAddChannel = () => {
    // 공백이 아닐 때
    if (newChannelName.trim()) {
      setSidebarData((prevData) => [
        ...prevData,
        { title: newChannelName, path: "/" },
      ]);
      setNewChannelName("");
      closeModal();
    }
  };

  // 카테고리 추가 모달창
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* handleClickOutside 함수에서 클릭 대상과 사이드바 요소 간의 포함 관계를 비교하여 외부 클릭을 감지 */}
      <nav
        className={
          sidebar ? `${styles.nav_menu} ${styles.active}` : styles.nav_menu
        }
      >
        <ul className={styles.navmenu_items}>
          {sidebarData.map((item, index) => {
            return (
              <li key={index} className={styles.nav_text}>
                <Link to={"#"}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}

          {isAdmin && (
            <li className={styles.nav_text} onClick={openModal}>
              <span>
                <FontAwesomeIcon icon={faCirclePlus} size="lg" /> 채널 추가
              </span>
            </li>
          )}
        </ul>
      </nav>
      {showModal && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>채널 추가</h2>
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="채널 이름 입력"
            />
            <div>
              <button onClick={handleAddChannel}>추가</button>
              <button onClick={closeModal}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Sidebar;
