import React, { useState } from "react";
import styles from "./SidebarModal.module.scss";

export interface SidebarModalProps {
  type: "add" | "edit" | "delete" | null;
  data: any;
  handleModal: (type: "add" | "edit" | "delete" | null, data?: any) => void;
  handleAction: (type: "add" | "edit" | "delete", data: any) => void;
}

const SidebarModal: React.FC<SidebarModalProps> = ({
  type,
  data,
  handleModal,
  handleAction,
}) => {
  const [updatedChannelName, setUpdatedChannelName] = useState("");

  const handleSubmit = () => {
    if (type === "edit") {
      handleAction(type, { ...data, name: updatedChannelName });
      console.log(updatedChannelName);
    } else if (type === "add" || type === "delete") {
      handleAction(type, data);
    }
  };

  const renderModalContent = () => {
    switch (type) {
      case "add":
        return (
          <div className={styles.modalinner}>
            <h2>채널 추가</h2>
            <input
              type="text"
              value={data}
              onChange={(e) => handleModal(type, e.target.value)}
              placeholder="채널 이름 입력"
            />
            <div>
              <button
                className={styles.sideBtn_le}
                type="button"
                onClick={handleSubmit}
              >
                추가
              </button>
              <button
                className={styles.sideBtn_ri}
                type="button"
                onClick={() => handleModal(null)}
              >
                취소
              </button>
            </div>
          </div>
        );
      case "edit":
        return (
          <div className={styles.modalinner}>
            <h2>채널 수정</h2>
            <input
              type="text"
              value={updatedChannelName}
              onChange={(e) => setUpdatedChannelName(e.target.value)}
              placeholder="채널 이름 입력"
            />
            <div>
              <button
                className={styles.sideBtn_le}
                type="button"
                onClick={handleSubmit}
              >
                <p>수정</p>
              </button>
              <button
                className={styles.sideBtn_ri}
                type="button"
                onClick={() => handleModal(null)}
              >
                <p>취소</p>
              </button>
            </div>
          </div>
        );

      case "delete":
        return (
          <div className={styles.modalinner}>
            <h2>카테고리 삭제</h2>
            <p>정말로 삭제하시겠습니까?</p>
            <div>
              <button
                className={styles.sideBtn_le}
                type="button"
                onClick={handleSubmit}
              >
                삭제
              </button>
              <button
                className={styles.sideBtn_ri}
                type="button"
                onClick={() => handleModal(null)}
              >
                취소
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {type && (
        <div className={styles.modal} onClick={() => handleModal(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {renderModalContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarModal;
