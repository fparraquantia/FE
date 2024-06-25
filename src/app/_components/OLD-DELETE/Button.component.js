// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------

// ------NODE MODULES---------------------------------------------------------
import { Fragment } from 'react';

import MuiButton from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// ------FILE MODULES---------------------------------------------------------

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_CHILDREN = <></>;
const DEFAULT_HAS_ICON = false;
const DEFAULT_ON_CLICK = () => {};
const DEFAULT_COLOR = '#1976d2';
const DEFAULT_BACKGROUND_COLOR = 'rgba(0, 0, 0, 0)';
const DEFAULT_HOVER_BACKGROUND_COLOR = 'rgba(1, 1, 1, 0.25)';
const DEFAULT_TEXT_TRANSFORM = 'none';
const DEFAULT_BUTTON_PROPS = {};
const DEFAULT_TOOLTIP = '';
const DEFAULT_TOOLTIP_PROPS = {
  arrow: true
};

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function Button(props) {
  const children = props.children || DEFAULT_CHILDREN;
  const disabled = props.disabled;
  const hasIcon = props.hasIcon || DEFAULT_HAS_ICON;
  const onClick = props.onClick || DEFAULT_ON_CLICK;
  const color = props.color || DEFAULT_COLOR;
  const backgroundColor = props.backgroundColor || DEFAULT_BACKGROUND_COLOR;
  const hoverBackgroundColor = props.hoverBackgroundColor || DEFAULT_HOVER_BACKGROUND_COLOR;
  const textTransform = props.textTransform || DEFAULT_TEXT_TRANSFORM;
  const width = props.width;
  const height = props.height;
  const buttonProps = { ...DEFAULT_BUTTON_PROPS, ...props.buttonProps, onClick, disabled };
  const tooltip = props.tooltip || DEFAULT_TOOLTIP;
  let tooltipProps = { ...DEFAULT_TOOLTIP_PROPS, ...props.tooltipProps, title: tooltip };

  if (!buttonProps.sx) {
    buttonProps.sx = {};
  }

  buttonProps.sx = {
    ...buttonProps.sx,
    backgroundColor,
    color,
    textTransform,
    width,
    height,
    '&:hover': {
      backgroundColor: hoverBackgroundColor
    }
  };

  let ButtonComponent = hasIcon ? IconButton : MuiButton;
  let TooltipComponent = Tooltip;

  if (!tooltip) {
    TooltipComponent = Fragment;
    tooltipProps = { key: tooltipProps.key, children: tooltipProps.children };
  }

  return (
    <TooltipComponent {...tooltipProps}>
      <ButtonComponent {...buttonProps}>{children}</ButtonComponent>
    </TooltipComponent>
  );
}
