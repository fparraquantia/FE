import React from "react";
import { Button, Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";

const DEFAULT_MAX_WIDTH="50%";
const DEFAULT_MIN_WIDTH="50%";
const DEFAULT_MIN_HEIGHT="20%";

export default function WarningBox(props) {
  const { title, open, onClose } = props;
  const maxWidth = props.maxWidth || DEFAULT_MAX_WIDTH;
  const minWidth = props.minWidth || DEFAULT_MIN_WIDTH;
  const minHeight = props.minHeight || DEFAULT_MIN_HEIGHT;
  const actions = props.actions || [];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxWidth,
          minWidth,
          minHeight
        }
      }}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers sx={{ whiteSpace: 'pre-line' }}>
        {props.children}
      </DialogContent>
      <DialogActions>
        {actions.map((action, index) => {
          return (
            <Button type={action.type} key={index} onClick={action.onClick} color={action.color}>
              {action.label}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
}
