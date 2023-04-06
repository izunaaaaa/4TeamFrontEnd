import React, { ReactElement, useEffect, useState } from "react";
import Feed from "./Feed";
import { CgMenuLeft } from "react-icons/cg";
import styles from "./Main.module.scss";
import Sidebar from "../../UI/Sidebar";

function Main(): ReactElement {
  const [mediaWidth, setMediaWidth] = useState<number>(window.innerWidth);
  const [sidebar, setSidebar] = useState<boolean>(false);

  useEffect(() => {
    // 창 크기가 조절될 때마다 mediaWidth 상태를 업데이트
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
          {/* <div className={styles.logo}>
            <h1>CurA</h1>
          </div> */}
          <div className={styles.nav_bar}>
            <h1>CurB</h1>
            <div className={styles.myFrofile}>
              <img src="http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg"></img>
            </div>
          </div>
          <Sidebar sidebar={true} />
          <div className={styles.main}></div>
        </>
      ) : (
        <>
          <div className={styles.nav_bar}>
            <div className={styles.sidebar_btn}>
              <CgMenuLeft onClick={() => setSidebar(!sidebar)} />
            </div>
            <h1>CurB</h1>
            <div className={styles.myFrofile}></div>
          </div>
          <div className={sidebar ? "nav_menu active" : "nav_menu"}>
            <Sidebar sidebar={sidebar} />
          </div>
        </>
      )}
      <Feed />
    </>
  );
}

export default Main;
