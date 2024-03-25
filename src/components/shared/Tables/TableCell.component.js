// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------

// ------NODE MODULES---------------------------------------------------------
import { Fragment } from 'react';

import Typography from '@mui/material/Typography';
import MuiTableCell from '@mui/material/TableCell';

// ------FILE MODULES---------------------------------------------------------

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_CHILDREN = <></>;
const DEFAULT_USE_TYPOGRAPHY = true;
const DEFAULT_COL_SPAN = null;
const DEFAULT_ALIGN = 'center';
const DEFAULT_FONT_SIZE = '0.75rem';
const DEFAULT_FONT_WEIGHT = 'bold';
const DEFAULT_COLOR = 'black';
const DEFAULT_CELL_PROPS = {
  sx: {
    whiteSpace: 'nowrap',
    borderBottom: '1px solid #000000'
  }
};
const DEFAULT_TYPOGRAPHY_PROPS = {};
const DEFAULT_TYPOGRAPHY_SX = {};

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function TableCell(props) {
  const children = props.children || DEFAULT_CHILDREN;
  const useTypography = props.useTypography === undefined ? DEFAULT_USE_TYPOGRAPHY : props.useTypography;
  const colSpan = props.colSpan || DEFAULT_COL_SPAN;
  const align = props.align || DEFAULT_ALIGN;
  const color = props.color || DEFAULT_COLOR;
  const fontSize = props.fontSize || DEFAULT_FONT_SIZE;
  const fontWeight = props.fontWeight || DEFAULT_FONT_WEIGHT;
  const cellProps = { ...DEFAULT_CELL_PROPS, ...props.cellProps, align, colSpan };
  const typographySx = { ...DEFAULT_TYPOGRAPHY_SX, ...props.typographySx, fontSize, fontWeight, color };
  let typographyProps = { ...DEFAULT_TYPOGRAPHY_PROPS, ...props.typographyProps, ...typographySx };

  let TypographyComponent = Typography;

  if (!useTypography) {
    TypographyComponent = Fragment;
    typographyProps = { key: typographyProps.key, children: typographyProps.children };
  }

  return (
    <MuiTableCell {...cellProps}>
      <TypographyComponent {...typographyProps}>
        {children}
      </TypographyComponent>
    </MuiTableCell>
  );
}
