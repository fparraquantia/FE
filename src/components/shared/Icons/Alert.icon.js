import SvgIcon from '@mui/material/SvgIcon';

const DEFAULT_COLOR = '#FF0000';
const DEFAULT_POSITION = 'absolute';
const DEFAULT_TRANSFORM = 'translate(100%, -125%)';

export default function Alert(props) {
  const color = props.color || DEFAULT_COLOR;
  const position = props.position === undefined ? DEFAULT_POSITION : props.position;
  const transform = props.transform === undefined ? DEFAULT_TRANSFORM : props.transform;

  return (
    <SvgIcon viewBox='0 0 15 15' style={{ width: 15, height: 15, position, transform, color }}>
      <circle cx='7.5' cy='7.5' r='7.5' />
    </SvgIcon>
  );
}
