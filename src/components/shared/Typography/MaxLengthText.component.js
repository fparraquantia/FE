// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------

// ------NODE MODULES---------------------------------------------------------
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// ------FILE MODULES---------------------------------------------------------

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_TEXT = '';
const DEFAULT_MAX_LENGTH = null;
const DEFAULT_COLOR = 'black';
const DEFAULT_TYPOGRAPHY_STYLE = {
  fontSize: '0.75rem',
  fontWeight: 'bold'
};
const DEFAULT_TYPOGRAPHY_PROPS = {};
const DEFAULT_TOOLTIP_PROPS = {
  arrow: true
};

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function MaxLengthText(props) {
  const text = props.text || DEFAULT_TEXT;
  const maxLength = props.maxLength || DEFAULT_MAX_LENGTH;
  const color = props.color || DEFAULT_COLOR;
  // Doing the ... before an object deconstructs it so all its keys and values are assigned to the new object.
  // If there is key conflictsm the last use of the object deconstruction is the one that takes priority for the values.
  const typographyStyle = { ...DEFAULT_TYPOGRAPHY_STYLE, ...props.typographyStyle };
  const typographyProps = { ...DEFAULT_TYPOGRAPHY_PROPS, ...props.typographyProps, sx: typographyStyle, color };
  const tooltipProps = { ...DEFAULT_TOOLTIP_PROPS, title: text, ...props.tooltipProps };

  typographyProps.sx.color = color;

  // If no max length was specified and we defaulted, we will simply return.
  // Otherwise, if we are under or equal to the max length, we will also simply return, as we do not need to truncate the text.
  if (maxLength === null || text.length <= maxLength) {
    return (
      // This is valid for JSX, as it will use all keys from the object as props.
      <Typography {...typographyProps}>{text}</Typography>
    );
  }

  return (
    <Tooltip {...tooltipProps}>
      <Typography {...typographyProps}>{`${text.substring(0, maxLength)}...`}</Typography>
    </Tooltip>
  );
}
