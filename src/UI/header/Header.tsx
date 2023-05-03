import React, { ReactElement, useEffect, useRef, useState } from "react";

import { HiMenu } from "react-icons/hi";
import styles from "./Header.module.scss";
import useClickOutside from "./useClickOutside";
import Sidebar from "UI/sidebar/Sidebar";
import DropDown from "./DropDown";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Header(): ReactElement {
  const [mediaWidth, setMediaWidth] = useState<number>(window.innerWidth);
  const [sidebar, setSidebar] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleSidebarToggle = () => {
    setSidebar(!sidebar);
  };

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
      {mediaWidth > 767 ? (
        <>
          <div className={styles.nav_bar}>
            <Link to={"home"}>
              {/* <h1>CurB</h1> */}
              <img
                src="https://velog.velcdn.com/images/view_coding/post/a8381e96-0dae-45bf-b30f-985c1d2d6359/image.png"
                alt="logo"
              />
            </Link>
            <div className={styles.rightWrapper}>
              <div className={styles.searchWrapper}>
                <SearchBar />
              </div>
              <DropDown />
            </div>
          </div>
          <Sidebar sidebar={true} setSidebar={setSidebar} />
        </>
      ) : (
        <>
          <div className={styles.nav_barMobile}>
            <div className={styles.sidebar_top}>
              {/* <h1>CurB</h1> */}
              <Link to={"home"}>
                <img
                  src="https://velog.velcdn.com/images/view_coding/post/ae532678-7a1e-4916-95d1-86b330f60f11/image.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div className={styles.sidebar_bottom}>
              <div className={styles.sidebar_btn} ref={sidebarRef}>
                <div onClick={handleSidebarToggle}>
                  <HiMenu
                    color="#161616"
                    size="2.5rem"
                    style={{ color: "grey" }}
                  />
                </div>
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
              </div>
              <SearchBar />
              <DropDown />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
