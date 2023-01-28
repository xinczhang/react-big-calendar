import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ label, chinese_label, has_event }) => {
  return (
    <div role="columnheader" aria-sort="none">
      <div className="chineselabel">{chinese_label}</div>
      <div className="daylabel">{label}</div>
      <div className={!has_event ? 'no-event-day' : undefined}>&#x2022;</div>
    </div>
  )
}

Header.propTypes = {
  label: PropTypes.node,
}

export default Header
