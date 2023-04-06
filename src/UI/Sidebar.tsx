import { useState } from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.scss";
import { SidebarProps } from "../interface/Interface";
import { Link } from "react-router-dom";

function Sidebar({ sidebar }: SidebarProps) {
  return (
    <>
      <nav
        className={
          sidebar ? `${styles.nav_menu} ${styles.active}` : styles.nav_menu
        }
      >
        <ul className={styles.navmenu_items}>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={styles.nav_text}>
                <Link to={"/"}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
export default Sidebar;
