import { useState } from 'react';

import { Navigate, useLinkClickHandler } from 'react-router-dom';

import { Checkbox, Divider, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';

import { useCookies } from 'react-cookie';

import routesConfig from '../../config/routes.config';
import landingTranslations from '../../constants/translations/landing.translations';

import Button from '../../components/shared/Buttons/Button.component';

import './Landing.view.css';
import Hider from '../../components/shared/Hider/Hider.component';

const USERNAME = 'rubiobotia';
const PASSWORD = 'rFdvun6w[!cypK*';

function LoginContainer(props) {
  const translate = props.translate;
  const forgotPassword = props.forgotPassword;

  const [cookies, setCookie] = useCookies(['session']);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const redirectToMap = useLinkClickHandler(routesConfig.Map);

  const onLoginClick = (e) => {
    if (username === USERNAME && password === PASSWORD) {
      setCookie('session', 'aaaaaaa', {sameSite: 'strict', maxAge: rememberMe ? 2592000 : 28800});
      redirectToMap(e);
      return;
    }

    setWrongCredentials(true);
  };

  return (
    <Grid container direction='column' rowSpacing={1}>
      <Grid item>
        <img className='kurita-logo' src='images/tedagua_logo.png' alt='tedagua-logo' />
      </Grid>
      <Grid item>
        <Grid container className='login-hint' direction='row' justifyContent='space-between' alignItems='flex-end'>
          <Grid item width='50%'>
            <Typography fontSize='16px' color='#808080'>
              {translate(landingTranslations.loginInstructions)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography textAlign='end' fontSize='14px' color='#0069C8'>
              {translate(landingTranslations.newUser)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Hider isHidden={!wrongCredentials} useBlockSpacing>
          <Typography color='red'>{translate(landingTranslations.wrongCredentials)}</Typography>
        </Hider>
      </Grid>

      <Grid item>
        <TextField
          placeholder={translate(landingTranslations.emailPlaceholder)}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: wrongCredentials ? 'red' : '#00000000',
            },
            '& .MuiInputBase-input': {
              backgroundColor: '#F7FAFD',
            },
          }}
        />
      </Grid>

      <Grid item>
        <TextField
          placeholder={translate(landingTranslations.passwordPlaceholder)}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          type='password'
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: wrongCredentials ? 'red' : '#00000000',
            },
            '& .MuiInputBase-input': {
              backgroundColor: '#F7FAFD',
            },
          }}
        />
      </Grid>

      <Grid item>
        <Grid container alignContent='flex-end' justifyContent='flex-end'>
          <Grid item>
            <Link onClick={forgotPassword} fontSize='14px' sx={{ textDecoration: 'none', color: '#B3B3B3' }}>
              {translate(landingTranslations.forgotPassword)}
            </Link>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Divider>
          <Typography fontSize='14px' color='#B3B3B3'>
            {translate(landingTranslations.orDelimiter)}
          </Typography>
        </Divider>
      </Grid>

      <Grid item>
        <Button width='100%' backgroundColor='#F7FAFD' color='#B3B3B3'>
          Sign in with Microsoft
        </Button>
      </Grid>

      <Grid item display='flex' justifyContent='center'>
        <img src='/images/not-a-robot 1.png' alt='Captcha' />
      </Grid>

      <Grid item>
        <Button backgroundColor='#0069C8' color='white' width='100%' height='50px' onClick={onLoginClick}>
          {translate(landingTranslations.loginButton)}
        </Button>
      </Grid>

      <Grid item>
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={(e, checked) => setRememberMe(checked)} />}
          label={
            <Typography fontSize='14px' color='#B3B3B3'>
              {translate(landingTranslations.rememberMe)}
            </Typography>
          }
        />
      </Grid>
    </Grid>
  );
}

export default function Landing(props) {
  const translate = props.translator;
  const login = props.login;
  const ComponentToRender = LoginContainer;
  const [cookies, setCookie] = useCookies(['session']);

  if (login) {
    setCookie('session', 'aaaaaaa', {sameSite: 'strict', maxAge: 2592000 });
    return <Navigate to={routesConfig.Map} />;
  }

  return (
    <div className='landing-container'>
      <img
        className='landing-background'
        src='images/landing_login_bg_2.jpg'
        alt='portal-background'
        width='100%'
        height='100%'
      />
      <div className='login-container'>
        <ComponentToRender translate={translate} />
      </div>

      <div className='display-rgpd-message'>
        <span>
          By using the site you agree to our{' '}
          <a href='https://www.kurita.eu/en/privacy-policy'>
            <u>privacy policy</u>
          </a>{' '}
          <p>and that we are collecting cookies to improve user experience.</p>
          <button className='i-understand' ng-click='hideMess()'>
            Got it
          </button>
        </span>
      </div>
    </div>
  );
}
