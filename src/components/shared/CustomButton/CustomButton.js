import React, { useState, useEffect, useCallback } from "react";
import styles from "./CustomButton.module.scss";

export default function CustomButton({
  title,
  style = "primary",
  paddinHorizontal = 30,
  onClick = () => {},
  disabled = false,
}) {
  const styleButton =
    style == "primary"
      ? styles[`buttonPrimary${disabled ? "Disabled" : "Enabled"}`]
      : style == "secondary"
      ? styles[`buttonSecondary${disabled ? "Disabled" : "Enabled"}`]
      : "";

  return (
    <div
      className={`${styles.button} ${styleButton}`}
      onClick={() => !disabled && onClick()}
      style={{
        padding: `0 ${paddinHorizontal}px`,
      }}
    >
      <span>{title}</span>
    </div>
  );
}
