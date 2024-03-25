import './Slide.component.css';

// PRIVATE

const DEFAULT = {
  name: "unknown"
}

// PUBLIC

export default function Slide(props) {
  let title = (<div />)
  let titleData = null
  let content = (<div />)
  let contentData = null

  const translator = props.translator
  const changeLanguage = props.changeLanguage;
  const name = props.name || DEFAULT.name

  if (props.title) {
    titleData = props.title(translator)
    title = (
      <div className='slide-title'>
        {titleData}
      </div>
    )
  }

  if (props.content) {
    contentData = props.content(translator, changeLanguage)
    content = (
      <div className='slide-infotainer'>
        {contentData}
      </div>
    )
  }

  let innerContainer = (
    <div className='slide-inner-container'>
      {title}
      {content}
    </div>
  )

  if (props.customBackground) {
    innerContainer = (
      <div className="slide-custom-background">
        {props.customBackground()}
        {titleData}
        {contentData}
      </div>
    )
  }

  return (
    <div className={'slide-' + name + '-container'} key={name}>
      {innerContainer}
    </div>
  )
}