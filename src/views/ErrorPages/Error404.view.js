import React from 'react';

import { Grid, Typography } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

export default function Error404(props) {
  const translate = props.translator;

  return (
    <div className='error-404-view'>
      <Grid container>
        <Grid item>
          <ErrorIcon />
        </Grid>
        <Grid item>
          <Typography>
            {translate('error-404-text')}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}