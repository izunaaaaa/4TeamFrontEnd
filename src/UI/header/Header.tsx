import React, { ReactElement, useEffect, useRef, useState } from "react";

import { CgMenuLeft } from "react-icons/cg";
import styles from "./Header.module.scss";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClickOutside from "./useClickOutside";
import Sidebar from "UI/sidebar/Sidebar";
import DropDown from "./DropDown";
import SearchBar from "./SearchBar";

function Header(): ReactElement {
  const [mediaWidth, setMediaWidth] = useState<number>(window.innerWidth);
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // 연관 검색어와 관련된 state
  const [searchText, setSearchText] = useState<string>("");
  const [relatedTags, setRelatedTags] = useState<string[]>([]);

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  const handleSidebarToggle = () => {
    setSidebar(!sidebar);
  };

  useClickOutside(dropdownRef, () => {
    setDropDown(false);
  });

  useClickOutside(sidebarRef, () => {
    setSidebar(false);
  });

  // 창 크기가 조절될 때마다 mediaWidth 상태를 업데이트
  useEffect(() => {
    const handleResize = () => {
      setMediaWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {mediaWidth > 768 ? (
        <>
          <div className={styles.nav_bar}>
            <h1>CurB</h1>
            <div className={styles.rightWrapper}>
              <div className={styles.searchWrapper}>
                <SearchBar />
              </div>
              <div className={styles.fofile_box} ref={dropdownRef}>
                <div className={styles.myFrofile} onClick={toggleDropdown}>
                  <img
                    src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"
                    alt="fofile"
                  ></img>
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
              <h1>CurB</h1>
            </div>
            <div className={styles.sidebar_bottom}>
              <div className={styles.sidebar_btn} ref={sidebarRef}>
                <CgMenuLeft onClick={handleSidebarToggle} />
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
              </div>
              <div className={styles.searchWrapper}>
                <SearchBar />
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
        </>
      )}
    </>
  );
}

export default Header;
