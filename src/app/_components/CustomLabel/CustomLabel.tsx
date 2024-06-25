import React, { ReactNode } from "react";
import styles from "./CustomLabel.module.scss";

interface CustomLabelProps {
  label: string;
  labelAlignment?: "left" | "center" | "right";
  labelPosition?: "left" | "top";
  widthLabel?: number;
  gap?: number;
  children: ReactNode;
}

export default function CustomLabel({
  label,
  labelAlignment = "right",
  labelPosition = "left",
  widthLabel = 140,
  children,
  gap,
}: CustomLabelProps) {
  const labelAlignmentStyle =
    labelAlignment == "left" || labelPosition == "top"
      ? styles.containerLabelLeft
      : labelAlignment == "center"
      ? styles.containerLabelCenter
      : labelAlignment == "right"
      ? styles.containerLabelRight
      : "";

  const gapStyle = gap ? gap : labelPosition == "left" ? 30 : 0;
  return (
    <div
      style={{
        gap: `${gapStyle}px`,
        flexDirection: labelPosition == "left" ? "row" : "column",
      }}
      className={styles.container}
    >
      {label && label !== "" ? (
        <div
          style={{ width: `${widthLabel}px` }}
          className={`${styles.containerLabel} ${labelAlignmentStyle}`}
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
