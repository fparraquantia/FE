// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------
import React from "react";

// ------NODE MODULES---------------------------------------------------------
import { Fragment } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

// ------FILE MODULES---------------------------------------------------------

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_TRANSLATE = (string) => {
  return string;
};
const DEFAULT_TEXT_KEY = 'spinner-loading';
const DEFAULT_IS_LOADING = false;
const DEFAULT_CHILDREN = null;
const DEFAULT_COMPONENT = Fragment;
const DEFAULT_COMPONENT_PROPS = {};

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function SpinnerLoader(props) {
  const translate = props.translate || DEFAULT_TRANSLATE;
  const text = props.text || translate(DEFAULT_TEXT_KEY);
  const isLoading = props.isLoading || DEFAULT_IS_LOADING;
  const children = props.children || DEFAULT_CHILDREN;
  const Component = props.component || DEFAULT_COMPONENT;
  const componentProps = { ...DEFAULT_COMPONENT_PROPS, ...props.componentProps };

  if (!isLoading) {
    return children;
  }

  return (
    <Component {...componentProps}>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid item>
          <Grid container direction='column' justifyContent='center' alignItems='center' spacing={1}>
            <Grid item>
              <CircularProgress sx={{ color: 'rgba(4, 146, 148, 1)' }} />
            </Grid>
            <Grid item>
              <Typography>{text}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Component>
  );
}
