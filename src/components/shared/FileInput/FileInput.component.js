// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------

// ------NODE MODULES---------------------------------------------------------
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import AttachFile from "@mui/icons-material/AttachFile";

// ------FILE MODULES---------------------------------------------------------
import "./FileInput.component.css";

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_DISABLED = false;
const DEFAULT_IS_MULTIPLE = false;
const DEFAULT_ON_CHANGE = () => {};
const DEFAULT_PLACEHOLDER = "";
const DEFAULT_VALUE = null;
const DEFAULT_REQUIRED = false;
const DEFAULT_INNER_INPUT_PROPS = {
  sx: { opacity: 0 },
};
const DEFAULT_INPUT_PROPS = {
  sx: {
    backgroundColor: "rgba(255, 255, 255, 0.38)",
    border: "3px solid rgba(4, 146, 148, 1)",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    fontSize: "1.125rem",
    width: "50rem",
  },
  startAdornment: (
    <InputAdornment position="start">
      <AttachFile />
    </InputAdornment>
  ),
};
const DEFAULT_TEXTFIELD_PROPS = {};

function Input(props) {
  const text = props.text;
  const className =props.className+" input-field"

  return (
    <div className="input-div">
      <input  {...props} className={className} />
      <span className="input-span">{text}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function FileInput(props) {
  const disabled = props.disabled || DEFAULT_DISABLED;
  const isMultiple = props.isMultiple || DEFAULT_IS_MULTIPLE;
  const onChange = props.onChange || DEFAULT_ON_CHANGE;
  const placeholder = props.placeholder || DEFAULT_PLACEHOLDER;
  const value = props.value || DEFAULT_VALUE;
  const required = props.required || DEFAULT_REQUIRED;

  const getTheInputText = () => {
    if (value === null || (Array.isArray(value) && value.length === 0)) {
      return placeholder || "";
    }

    if (value && hasAtLeastOneFile) {
      if (Array.isArray(value) && value.length > 1) {
        return `${value.length} files`;
      }

      return value instanceof File ? value.name : value[0]?.name || "";
    }
    return "";
  };

  const hasAtLeastOneFile = Array.isArray(value) ? value.length > 0 : value instanceof File;

  const handleChange = (event) => {
    const fileList = event.target.files;
    const files = fileList ? Array.from(fileList) : [];

    if (isMultiple) {
      onChange(files);
    } else {
      onChange(files[0]);
    }
  };

  const innerInputProps = {
    ...DEFAULT_INNER_INPUT_PROPS,
    ...props.innerInputProps,
    text: getTheInputText(),
    multiple: isMultiple,
    isPlaceholder: value === null || (Array.isArray(value) && value.length === 0),
    placeholder,
    required,
    isMultiple,
    selection: value,
    sx:{
      paddingRight:0
    }
  };

  const inputProps = {
    ...DEFAULT_INPUT_PROPS,
    ...props.inputProps,
    inputProps: innerInputProps,
    inputComponent: Input,
  };

  const textFieldProps = {
    ...DEFAULT_TEXTFIELD_PROPS,
    ...props.textFieldProps,
    type: "file",
    disabled,
    onChange: handleChange,
    InputProps: inputProps,
  };

  return <TextField {...textFieldProps} />;
}
