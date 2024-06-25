import React, { useState, useEffect, useCallback } from "react";
import styles from "./CustomInput.module.scss";
import { debounce } from "lodash";

export default function CustomInput({
  placeholder = "",
  initValue = "",
  onChange = () => {},
  name = "",
  type = "text",
  style = "primary",
  label = "",
  labelPosition = "right",
  labelStyle = "normal",
  widthLabel = 140,
  debounceDelay = 300,
  gap = 30,
  ...props
}) {
  const [inputValue, setInputValue] = useState(initValue);
  useEffect(() => {
    setInputValue(initValue);
  }, [initValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const debouncedOnChange = useCallback(
    debounce((value) => {
      onChange && onChange(value);
    }, debounceDelay),
    [onChange, debounceDelay]
  );

  useEffect(() => {
    debouncedOnChange(inputValue);
  }, [inputValue]);

  const bgColorStyle =
    style == "primary"
      ? styles.inputContainerInputPrimary
      : style == "secondary"
      ? styles.inputContainerInputSecondary
      : style == "grey"
      ? styles.inputContainerInputGrey
      : "";

  const labelPositionStyle =
    labelPosition == "left"
      ? styles.inputContainerLabelLeft
      : labelPosition == "center"
      ? styles.inputContainerLabelCenter
      : labelPosition == "right"
      ? styles.inputContainerLabelRight
      : "";

  const labelStyleClass =
    labelStyle == "normal"
      ? styles.inputContainerLabelNormal
      : labelStyle == "title"
      ? styles.inputContainerLabelTitle
      : "";

  return (
    <div style={{ gap: `${gap}px` }} className={styles.inputContainer}>
      {label && label !== "" ? (
        <div
          style={{ width: `${widthLabel}px` }}
          className={`${styles.inputContainerLabel} ${labelPositionStyle} ${labelStyleClass}`}
        >
          <p>{label}</p>
        </div>
      ) : (
        <></>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        name={name}
        className={`${styles.inputContainerInput} ${bgColorStyle}`}
        {...props}
      />
    </div>
  );
}
