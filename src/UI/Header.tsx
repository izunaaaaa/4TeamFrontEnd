import React, { ReactElement, useEffect, useRef, useState } from "react";

import { CgMenuLeft } from "react-icons/cg";
import styles from "./Header.module.scss";
import DropDown from "./DropDown";
import Sidebar from "./Sidebar";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "./useClickOutside";

function Header(): ReactElement {
  const [mediaWidth, setMediaWidth] = useState<number>(window.innerWidth);
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(dropdownRef, () => {
    setDropDown(false);
  });

  useClickOutside(sidebarRef, () => {
    setSidebar(false);
  });

  useEffect(() => {
    const handleResize = () => {
      setMediaWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };

  // 창 크기가 조절될 때마다 mediaWidth 상태를 업데이트

  return (
    <>
      {mediaWidth > 768 ? (
        <>
          <div className={styles.nav_bar}>
            <h1>CurB</h1>
            <div className={styles.rightWrapper}>
              <div className={styles.searchWrapper}>
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="Search text"
                />
                <FontAwesomeIcon
                  className={styles.searchIcon}
                  icon={faMagnifyingGlass}
                />
              </div>
              <div className={styles.fofile_box} ref={dropdownRef}>
                <div className={styles.myFrofile} onClick={toggleDropdown}>
                  <img src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"></img>
                </div>
                {dropDown && (
                  <div className={styles.dropList}>
                    <DropDown />
                  </div>
                )}
              </div>
            </div>
          </div>

          <Sidebar sidebar={true} setSidebar={setSidebar} />
        </>
      ) : (
        <>
          <div className={styles.nav_barMobile}>
            <div className={styles.sidebar_top}>
              <div className={styles.sidebar_btn}>
                <CgMenuLeft onClick={toggleSidebar} />
              </div>
              <h1>CurB</h1>
              <div className={styles.fofile_box} ref={dropdownRef}>
                <div className={styles.myFrofile} onClick={toggleDropdown}>
                  <img src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"></img>
                </div>
                {dropDown && (
                  <div className={styles.dropList}>
                    <DropDown />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.sidebar_bottom}>
              <div className={styles.searchWrapper_mobile}>
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="Search text"
                />
                <FontAwesomeIcon
                  className={styles.searchIcon}
                  icon={faMagnifyingGlass}
                />
              </div>
            </div>
          </div>
          {sidebar && (
            <div
              className={
                sidebar
                  ? `${styles.nav_menu} ${styles.active}`
                  : styles.nav_menu
              }
              ref={sidebarRef}
            >
              <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Header;
