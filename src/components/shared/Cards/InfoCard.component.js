// IMPORTS
import React from 'react';
import { Grid, Typography } from '@mui/material';

// PRIVATE
const DEFAULT = {
  size: 4,
  spacing: 1
}

// PUBLIC

export default function InfoCard(props) {
  const size = props.size || DEFAULT.size;
  const spacing = props.spacing || DEFAULT.spacing;

  let identifier = null;
  let image = null;
  let title = null;
  let subtitle = null;
  let description = null;

  if (props.image || props.svg) {
    const imageProp = props.image
    const svg = props.svg

    if (svg) {
      image = (
        <Grid item>
          {svg}
        </Grid>
      )
    } else {
      image = (
        <Grid item>
          <img className={imageProp.className} src={imageProp.src} alt={imageProp.alt} />
        </Grid>
      )
    }
  }

  if (props.identifier) {
    identifier = (
      <Grid item>
        <Typography {...props.titleProps}>
          {props.identifier}
        </Typography>
      </Grid>
    )
  }

  if (props.title) {
    title = (
      <Grid item>
        <Typography {...props.titleProps}>
          {props.title}
        </Typography>
      </Grid>
    )
  }

  if (props.subtitle) {
    subtitle = (
      <Grid item>
        <Typography {...props.subtitleProps}>
          {props.subtitle}
        </Typography>
      </Grid>
    )
  }

  if (props.description) {
    description = (
      <Grid item>
        <Typography {...props.descriptionProps}>
          {props.description}
        </Typography>
      </Grid>
    )
  }

  return (
    <Grid item md={size}>
      <Grid container direction="column" spacing={spacing}>
        {identifier}
        {image}
        {title}
        {subtitle}
        {description}
      </Grid>
    </Grid>
  )
}