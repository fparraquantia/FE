import React from "react";
import { IconButton, Tooltip } from "@mui/material";

export default function ButtonWithOutline(props) {
  let modifiableProps = { ...props };

  if (!modifiableProps.className) {
    modifiableProps.className = "circular-button";
  }

  if (!modifiableProps.component) {
    modifiableProps.component = "label";
  }

  if (!modifiableProps.sx) {
    modifiableProps.sx = { color: "#A9D9D0", border: "2px solid #A9D9D0", borderRadius: "50%" };
  }

  if (modifiableProps.color) {
    modifiableProps.sx.color = modifiableProps.color;
    modifiableProps.sx.border = "2px solid " + modifiableProps.color;

    modifiableProps.color = undefined;
  }

  let currentIcon = <IconButton {...modifiableProps}>{modifiableProps.children}</IconButton>;

  if (modifiableProps.tooltip) {
    currentIcon = (
      <Tooltip arrow title={modifiableProps.tooltip}>
        {currentIcon}
      </Tooltip>
    );
  }

  if (modifiableProps.href) {
    currentIcon = <a {...modifiableProps}>{currentIcon}</a>;
  }
  return currentIcon;
}
