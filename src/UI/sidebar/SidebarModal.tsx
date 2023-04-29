import React, { useEffect, useState } from "react";
import styles from "./SidebarModal.module.scss";

interface SidebarModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function SidebarModal({ isOpen, onClose, title, children }: SidebarModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default SidebarModal;
