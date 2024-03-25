// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------
// ------NODE MODULES---------------------------------------------------------
import React from 'react';

import Select2 from 'react-select';

import Grid from '@mui/material/Grid';

// ------FILE MODULES---------------------------------------------------------

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_GRID_PROPS = {
  paddingTop: 1,
  paddingRight: 1,
  paddingBottom: 1,
  item: true
};
const DEFAULT_STYLE = {
  minHeight: '2.938rem',
  width: '16.563rem',
  backgroundColor: '#F7FAFD',
  border: 'unset',
  borderRadius: '5px',
  fontSize: '1rem'
};
const DEFAULT_LABEL = '';
const DEFAULT_REQUIRED = false;
const DEFAULT_DISABLED = false;
const DEFAULT_MULTIVALUE = false;
const DEFAULT_OPTIONS = [];
const DEFAULT_GET_OPTION_LABEL = (option) => option;
const DEFAULT_GET_OPTION_VALUE = (option) => option;
const DEFAULT_ON_CHANGE = () => {};
const DEFAULT_VALUE = '';
const DEFAULT_IS_LOADING = false;
const DEFAULT_NO_OPTIONS_MESSAGE = null;

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function Dropdown(props) {
  const gridProps = { ...DEFAULT_GRID_PROPS, ...props.gridProps };
  const selectStyle = {
    control: (baseStyles) => ({
      ...baseStyles,
      ...DEFAULT_STYLE,
      ...props.selectStyle
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      zIndex: '3'
    })
  };
  const label = props.label || DEFAULT_LABEL;
  const required = props.required || DEFAULT_REQUIRED;
  const disabled = props.disabled || DEFAULT_DISABLED;
  const multivalue = props.multivalue || DEFAULT_MULTIVALUE;
  const options = props.options || DEFAULT_OPTIONS;
  const getOptionLabel = props.getOptionLabel || DEFAULT_GET_OPTION_LABEL;
  const getOptionValue = props.getOptionValue || DEFAULT_GET_OPTION_VALUE;
  const onChange = props.onChange || DEFAULT_ON_CHANGE;
  const value = props.value || DEFAULT_VALUE;
  const isLoading = props.isLoading || DEFAULT_IS_LOADING;
  const noOptionsMessage = props.noOptionsMessage || DEFAULT_NO_OPTIONS_MESSAGE;

  const noOptionsMessageFunc = noOptionsMessage
    ? () => {
        return noOptionsMessage;
      }
    : undefined;

  return (
    <Grid {...gridProps}>
      <Select2
        styles={selectStyle}
        noOptionsMessage={noOptionsMessageFunc}
        placeholder={label}
        required={required}
        isDisabled={disabled}
        options={options}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        closeMenuOnSelect={!multivalue}
        isMulti={multivalue}
        onChange={onChange}
        value={value}
        isLoading={isLoading}
      />
    </Grid>
  );
}
