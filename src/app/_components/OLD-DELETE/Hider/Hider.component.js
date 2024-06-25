// ---------------------------------------------------------------------------
// IMPORTS
// ---------------------------------------------------------------------------

// ------NODE MODULES---------------------------------------------------------

// ------FILE MODULES---------------------------------------------------------

// ---------------------------------------------------------------------------
// PRIVATE
// ---------------------------------------------------------------------------
const DEFAULT_IS_HIDDEN = false;
const DEFAULT_USE_BLOCK_SPACING = false;
const DEFAULT_CHILDREN = null;

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------
export default function Hider(props) {
  const isHidden = props.isHidden || DEFAULT_IS_HIDDEN;
  const useBlockSpacing = props.useBlockSpacing || DEFAULT_USE_BLOCK_SPACING;
  const children = props.children || DEFAULT_CHILDREN;

  if (!isHidden) {
    return children;
  }

  if (!useBlockSpacing) {
    return <></>;
  }

  return (
    <div style={{display: 'block', opacity: '0%'}}>
      {children}
    </div>
  )
}