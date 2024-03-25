// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------

// ------NODE MODULES---------------------------------------------------------
import TableRow from '@mui/material/TableRow';

// ------FILE MODULES---------------------------------------------------------
import TableCell from './TableCell.component';

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_CHILDREN = <></>;
const DEFAULT_COL_SPAN = null;
const DEFAULT_ALIGN = 'center';
const DEFAULT_ROW_PROPS = {};
const DEFAULT_CELL_PROPS = {
  sx: {
    whiteSpace: 'nowrap',
    borderBottom: '1px solid #000000'
  }
};

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function SingleTableRow(props) {
  const children = props.children || DEFAULT_CHILDREN;
  const colSpan = props.colSpan || DEFAULT_COL_SPAN;
  const align = props.align || DEFAULT_ALIGN;
  const rowProps = { ...DEFAULT_ROW_PROPS, ...props.rowProps };
  const cellProps = { ...DEFAULT_CELL_PROPS, ...props.cellProps, align, colSpan };

  return (
    <TableRow {...rowProps}>
      <TableCell {...cellProps}>
        {children}
      </TableCell>
    </TableRow>
  );
}
