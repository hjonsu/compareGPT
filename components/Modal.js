import { useState } from "react";
import Modal from "react-modal";
import styles from "../pages/modal.module.css";

export default function InfoModal({ button, title, children }) {
  const [showModal, setShowModal] = useState(true);
  const customStyles = {
    content: {
      width: "50%",
      margin: "auto",
      backgroundColor: "#181d27",
      color: "white",
      zIndex: "199",
    },
  };

  return (
    <>
      <button className={styles.button} onClick={() => setShowModal(true)}>
        {button}
      </button>
      <Modal
        style={customStyles}
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <button
          className={styles.buttonSecondary}
          onClick={() => setShowModal(false)}
        >
          x
        </button>
        <div className={styles.modal}>
          <h1 className={styles.title}> {title} </h1>
          <div className={styles.content}> {children}</div>
        </div>
      </Modal>
    </>
  );
}
