import React from 'react'
import { Grid, Typography } from '@mui/material'
import contacts from '../../../config/contacts.config'
import DigitalisIcon from '../Icons/DigitalisIcon.component'
import './Footer.component.css'

export default function Footer(props) {
  const translate = props.translator

  return (
    <Grid container spacing={5} padding={10} direction="column">
      <Grid item>
        <Typography variant="h4">
          {translate('contact-title')}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={2}>
          {contacts.contactPersonel.map((person, index) => (
            <Grid item md={6} key={index}>
              <Typography variant="body">
                {person}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={2} justifyContent="flex-end">
          {contacts.socialMediaSvgs.map((svg, index) => (
            <Grid item key={index}>
              {svg}
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="body">
          {translate('contact-description')}
        </Typography>
      </Grid>
      <Grid item>
        <DigitalisIcon />
      </Grid>
    </Grid>
  )
}