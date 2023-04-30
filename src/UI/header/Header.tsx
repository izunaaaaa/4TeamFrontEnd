import React, { ReactElement, useEffect, useRef, useState } from "react";

import { CgMenuLeft } from "react-icons/cg";
import styles from "./Header.module.scss";
import useClickOutside from "./useClickOutside";
import Sidebar from "UI/sidebar/Sidebar";
import DropDown from "./DropDown";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import useUser from "components/form/User/Hook/useUser";
import { useSide } from "UI/sidebar/hook/useSide";

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
              <img
                src="https://velog.velcdn.com/images/view_coding/post/a8381e96-0dae-45bf-b30f-985c1d2d6359/image.png"
                alt="logo"
              />
            </div>
            <div className={styles.sidebar_bottom}>
              <div className={styles.sidebar_btn} ref={sidebarRef}>
                <div onClick={handleSidebarToggle}>
                  <CgMenuLeft color="#161616" size="2.5rem" />
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
