import React from "react";
import styles from "./Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import CustomButton from "../CustomButton/CustomButton";

export default function Modal({
  show,
  setShow,
  title,
  subtitle,
  buttonDisabled = false,
  onClickButton = () => {},
  type = "add",
  children,
}) {
  return (
    <div className={`${styles.modal} ${show ? styles.show : ""}`}>
      <div className={`${styles.modalContainer} ${show ? styles.show : ""}`}>
        <div className={styles.modalContainerHeader}>
          <p
            className={`${styles.modalContainerHeaderTitle} ${
              type == "add"
                ? styles.modalContainerHeaderTitleAdd
                : styles.modalContainerHeaderTitleEdit
            }`}
          >
            {title}
          </p>
          <div
            className={styles.modalContainerHeaderClose}
            onClick={() => {
              setShow(false);
            }}
          >
            <AiOutlineClose size={20} style={{ color: "#b3b3b3" }} />
          </div>
        </div>
        {subtitle && subtitle !== "" ? (
          <p className={`${styles.modalContainerSubtitle}`}>{subtitle}</p>
        ) : (
          <></>
        )}

        <div className={styles.modalContainerBody}>{children}</div>
        <div className={styles.modalContainerFooter}>
          <CustomButton
            title="Cancel"
            style="secondary"
            onClick={() => {
              setShow(false);
            }}
          />
          <CustomButton
            title={type == "add" ? "Add" : "Edit"}
            style="primary"
            onClick={onClickButton}
            disabled={buttonDisabled}
          />
        </div>
      </div>
      <div
        className={styles.modalBackground}
        onClick={() => {
          setShow(false);
        }}
      />
    </div>
  );
}
