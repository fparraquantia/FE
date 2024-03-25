// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------

// ------NODE MODULES---------------------------------------------------------
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "./TableCell.component";
import { Typography } from "@mui/material";

// ------FILE MODULES---------------------------------------------------------

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_HEADERS = [];
const DEFAULT_FONT_SIZE = "0.938rem";
const DEFAULT_FONT_WEIGHT = "bold";
const DEFAULT_CELL_PROPS = {
  sx: {
    whiteSpace: "nowrap",
    borderBottom: 'unset'
  },
};
const DEFAULT_TYPOGRAPHY_PROPS = {};
const DEFAULT_TYPOGRAPHY_SX = {};
const DEFAULT_ROW_PROPS = {};

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function TableHeader(props) {
  const headers = props.headers || DEFAULT_HEADERS;
  const fontSize = props.fontSize || DEFAULT_FONT_SIZE;
  const fontWeight = props.fontWeight || DEFAULT_FONT_WEIGHT;
  const typographySx = { ...DEFAULT_TYPOGRAPHY_SX, ...props.typographySx, fontSize, fontWeight };
  const typographyProps = { ...DEFAULT_TYPOGRAPHY_PROPS, ...props.typographyProps, ...typographySx };
  const muiCellProps = { ...DEFAULT_CELL_PROPS, ...props.cellProps };
  const cellProps = { ...muiCellProps };
  const rowProps = { ...DEFAULT_ROW_PROPS, ...props.rowProps };

  return (
    <TableHead>
      <TableRow {...rowProps}>
        {headers.map((header) => (
          <TableCell cellProps={cellProps} align={header.align} key={header.text} useTypography={false}>
            <Typography {...typographyProps}>
              {header.text}
            </Typography>
            {header.component}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
