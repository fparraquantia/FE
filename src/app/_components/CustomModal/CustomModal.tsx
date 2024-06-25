import { Colors } from "@/_styles/variables/colors";
import { Close, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, IconButton, Modal } from "@mui/material";
import React, { ReactNode } from "react";

import styles from "./CustomModal.module.scss";

interface ModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  title: string;
  subtitle?: string;
  buttonDisabled?: boolean;
  onClickButton?: () => void;
  isLoadingButton?: boolean;
  type?: "add" | "edit" | "delete";
  children?: ReactNode;
}

export default function CustomModal({
  show,
  setShow,
  title,
  subtitle = "",
  buttonDisabled = false,
  onClickButton = () => {},
  isLoadingButton = false,
  type = "add",
  children,
}: ModalProps) {
  return (
    <Modal
      open={show}
      onClose={() => {
        setShow(false);
      }}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description">
      <div className={styles.modalContainer}>
        <div className={styles.modalContainerHeader}>
          <p
            className={`${styles.modalContainerHeaderTitle} ${
              type === "add"
                ? styles.modalContainerHeaderTitleAdd
                : type === "edit"
                  ? styles.modalContainerHeaderTitleEdit
                  : styles.modalContainerHeaderTitleDelete
            }`}>
            {title}
          </p>
          <IconButton
            aria-label="close"
            size="small"
            onClick={() => {
              setShow(false);
            }}>
            <Close fontSize="small" />
          </IconButton>
        </div>
        {subtitle ? <p className={styles.modalContainerSubtitle}>{subtitle}</p> : null}

        <div className={styles.modalContainerBody}>{children}</div>
        <div className={styles.modalContainerFooter}>
          <Button
            variant="contained"
            color="greyAccent"
            onClick={() => {
              setShow(false);
            }}>
            Cancel
          </Button>
          <LoadingButton
            loading={isLoadingButton}
            loadingPosition={type == "delete" ? "end" : undefined}
            variant="contained"
            endIcon={type == "delete" ? <Delete /> : ""}
            disabled={buttonDisabled}
            onClick={onClickButton}
            sx={{ height: 36.5, minWidth: 66 }}
            color={type != "delete" ? "primary" : "error"}>
            {isLoadingButton ? "" : type === "add" ? "Add" : type == "edit" ? "Edit" : "Delete"}
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
}
