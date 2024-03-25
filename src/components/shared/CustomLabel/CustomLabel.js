import React from "react";
import styles from "./CustomLabel.module.scss";

export default function CustomLabel({
  label,
  labelPosition = "right",
  widthLabel = 140,
  children,
  gap = 30,
}) {
  const labelPositionStyle =
    labelPosition == "left"
      ? styles.containerLabelLeft
      : labelPosition == "center"
      ? styles.containerLabelCenter
      : labelPosition == "right"
      ? styles.containerLabelRight
      : "";

  return (
    <div style={{ gap: `${gap}px` }} className={styles.container}>
      {label && label !== "" ? (
        <div
          style={{ width: `${widthLabel}px` }}
          className={`${styles.containerLabel} ${labelPositionStyle}`}
        >
          <p>{label}</p>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.containerChildren}>{children || ""}</div>
    </div>
  );
}
