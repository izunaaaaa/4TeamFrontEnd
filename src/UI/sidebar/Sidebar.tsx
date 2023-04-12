import { useEffect, useState } from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "../../interface/Interface";
import { Link } from "react-router-dom";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { instance } from "api/axios/axiosSetting";

interface Category {
  id: number;
  name: string;
}

function Sidebar({ sidebar, setSidebar }: SidebarProps) {
  // 새로운 채널의 이름을 저장하는 상태 변수
  const [newChannelName, setNewChannelName] = useState("");
  const [showModal, setShowModal] = useState(false);
  //const [sidebarData, setSidebarData] = useState(SidebarData);
  const [sidebarData, setSidebarData] = useState<Category[]>([]);
  // 관리자 여부를 나타내는 상태
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await instance.get("/categories/?group=oz");
      setSidebarData(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addCategory = async (name: string) => {
    try {
      const response = await instance.post("/categories/?group=oz", { name });
      setSidebarData((prevData) => [...prevData, response.data]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleAddChannel = () => {
    if (newChannelName.trim()) {
      addCategory(newChannelName);
      setNewChannelName("");
      closeModal();
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const renderSidebarData = () =>
    sidebarData?.map((item, index) => (
      <li key={index} className={styles.nav_text}>
        <Link to={"#"}>
          <span>{item.name}</span>
        </Link>
      </li>
    ));

  const renderAddChannelButton = () => (
    <li className={styles.nav_text} onClick={openModal}>
      <span>
        <FontAwesomeIcon icon={faCirclePlus} size="lg" /> 채널 추가
      </span>
    </li>
  );

  return (
    <>
      <nav
        className={
          sidebar ? `${styles.nav_menu} ${styles.active}` : styles.nav_menu
        }
      >
        <ul className={styles.navmenu_items}>
          {renderSidebarData()}
          {isAdmin && renderAddChannelButton()}
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
