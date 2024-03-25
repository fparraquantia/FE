// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------

// ------NODE MODULES---------------------------------------------------------
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";

// ------FILE MODULES---------------------------------------------------------

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_REQUIRED = false;
const DEFAULT_DATE = "1/1/1970";
const DEFAULT_OFFSET = 86400000;
const DEFAULT_MIN = "";
const DEFAULT_MAX = "";
const DEFAULT_VALUE = "";
const DEFAULT_ON_CHANGE = () => {};
const DEFAULT_INPUT_PROPS = {
  style: {
    fontSize: '1.125rem'
  }
};
const DEFAULT_TEXT_FIELD_STYLE = {
  backgroundColor: '#FFFFFF',
  border: 'unset',
  borderRadius: '5px',
  fontSize: '1.125rem',
  color: '#B3B3B3',
  padding: "0.5rem"
};

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function TimePicker(props) {
  const required = props.required || DEFAULT_REQUIRED;
  const defaultDate = props.defaultDate || DEFAULT_DATE;
  const offset = props.offset || DEFAULT_OFFSET;
  const min = props.min ? new Date(props.min + offset).toISOString().split("T")[1].slice(0, 5) : DEFAULT_MIN;
  const max = props.max ? new Date(props.max - offset).toISOString().split("T")[1].slice(0, 5) : DEFAULT_MAX;
  const value = props.value ? new Date(props.value).toISOString().split("T")[1].slice(0, 5) : DEFAULT_VALUE;
  const onChange = props.onChange || DEFAULT_ON_CHANGE;
  const inputProps = { ...DEFAULT_INPUT_PROPS, ...props.inputProps, min, max };
  const textFieldStyle = { ...DEFAULT_TEXT_FIELD_STYLE, ...props.textFieldStyle };

  const handleChange = (event) => {
    onChange(new Date(`${defaultDate} ${event.target.value}`).getTime())
  }

  return (
    <Grid item>
      <InputBase
        type='time'
        required={required}
        value={value}
        onChange={handleChange}
        inputProps={inputProps}
        sx={textFieldStyle}
      />
    </Grid>
  );
}
