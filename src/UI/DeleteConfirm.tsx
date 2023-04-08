import React from "react";
import styles from "./DeleteConfirm.module.scss";

const DeleteConfirm = (props: any) => {
  return (
    <div className={styles.deleteDiv}>
      <h1 className={styles.deleteTitle}>삭제하시겠습니까?</h1>
      <div className={styles.deleteBtnDiv}>
        <button>삭제</button>
        <button onClick={props.onClose}>취소</button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
