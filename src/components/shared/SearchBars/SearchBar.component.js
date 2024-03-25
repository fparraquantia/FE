// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------
// ------NODE MODULES---------------------------------------------------------
import React from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FilledInput from '@mui/material/FilledInput';

import Search from '@mui/icons-material/Search';

// ------FILE MODULES---------------------------------------------------------

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_TRANSLATE = (string) => {
  return string;
};
const DEFAULT_PLACEHOLDER = 'Search...';
const DEFAULT_VALUE = '';
const DEFAULT_DISABLED = false;
const DEFAULT_ON_CHANGE = () => {};
const DEFAULT_ON_SUBMIT = () => {};
const DEFAULT_STYLE = {
  height: '2rem',
  width: '16.563rem',
  backgroundColor: '#FFFFFF',
  border: 'unset',
  borderRadius: '5px',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '0rem',
  '&:hover': {
    border: 'unset'
  }
};

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function SearchBar(props) {
  const translate = props.translate || DEFAULT_TRANSLATE;
  const placeholder = props.placeholder || translate(DEFAULT_PLACEHOLDER);
  const value = props.value || DEFAULT_VALUE;
  const disabled = props.disabled || DEFAULT_DISABLED;
  const onChange = props.onChange || DEFAULT_ON_CHANGE;
  const onSubmit = props.onSubmit || DEFAULT_ON_SUBMIT;
  const style = { ...DEFAULT_STYLE, ...props.style };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl variant='filled'>
        <InputLabel htmlFor='filled-adornment-search' sx={{ overflow: 'unset' }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: '500', lineHeight: '0rem', color: '#B3B3B3' }}>{placeholder}</Typography>
        </InputLabel>
        <FilledInput
          disableUnderline
          value={value}
          disabled={disabled}
          onChange={onChange}
          sx={style}
          type='text'
          endAdornment={
            <InputAdornment position='end'>
              <Search fontSize='large' sx={{ color: '#B3B3B3', fontSize: '2rem' }} />
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
}
