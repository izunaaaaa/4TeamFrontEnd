import React, { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  title: string;
  submitLabel: string;
  children: React.ReactNode;
};

const SidebarModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  submitLabel,
  children,
}: ModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h2>{title}</h2>
              <button className="modal-close" type="button" onClick={onClose}>
                X
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                className="modal-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {submitLabel}
              </button>
              <button className="modal-cancel" type="button" onClick={onClose}>
                취소
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default SidebarModal;
