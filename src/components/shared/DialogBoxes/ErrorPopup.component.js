// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------

// ------NODE MODULES---------------------------------------------------------
import { Typography } from '@mui/material';

// ------FILE MODULES---------------------------------------------------------
import WarningBox from './WarningBox.component';

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_TRANSLATE = (string) => string;
const DEFAULT_IS_OPEN = false;
const DEFAULT_ERROR = {};
const DEFAULT_HANDLE_CLOSE = () => {};
const DEFAULT_TITLE_TRANSLATION = 'error-popup-title';
const DEFAULT_CLOSE_BUTTON_TEXT = 'error-popup-close';

const KEYCLOAK_WRONG_CREDS_ERROR = 'invalid_grant';

const ERROR_GENERIC = 'error-popup-generic-description';
const ERROR_LOGIN = 'error-popup-login-description';
const ERROR_413 = 'error-popup-413-description';

function getTranslationKeyForError(error) {
  if (!error.response) {
    return ERROR_GENERIC;
  }

  if (error.response.data.error === KEYCLOAK_WRONG_CREDS_ERROR) {
    return ERROR_LOGIN;
  }

  switch (error.response.status) {
    default:
      return ERROR_GENERIC;
    case 413:
      return ERROR_413;
  }
}

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function ErrorPopup(props) {
  const translate = props.translate || DEFAULT_TRANSLATE;
  const isOpen = props.isOpen || DEFAULT_IS_OPEN;
  const error = props.error || DEFAULT_ERROR;
  const handleClose = props.handleClose || DEFAULT_HANDLE_CLOSE;

  const title = props.title || translate(DEFAULT_TITLE_TRANSLATION);
  const closeButtonText = props.closeButtonText || translate(DEFAULT_CLOSE_BUTTON_TEXT);

  const actions = [
    {
      label: closeButtonText,
      onClick: handleClose
    }
  ];

  const translationKey = getTranslationKeyForError(error);

  return (
    <WarningBox title={title} open={isOpen} onClose={handleClose} actions={actions}>
      <Typography>{translate(translationKey)}</Typography>
    </WarningBox>
  );
}
