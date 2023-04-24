import { useState } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel: string;
  cancelLabel: string;
}

function SidebarModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
}: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleConfirm = () => {
    onConfirm();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsModalOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className={styles.modal} onClick={handleClick}>
          <div className={styles.modalContent}>
            <h2>{title}</h2>
            <p>{message}</p>
            <div className={styles.buttons}>
              <button onClick={handleConfirm}>{confirmLabel}</button>
              <button onClick={handleCancel}>{cancelLabel}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SidebarModal;
