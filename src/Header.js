import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ label, chinese_label, has_event }) => {
  return (
    <div role="columnheader" className="columnheader" aria-sort="none">
      <div className="chineselabel">{chinese_label}</div>
      <div className="daylabel">{label}</div>
      <div className={!has_event ? 'no-event-day' : undefined}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="5" className="has-event" fill="#CACCCD"/>
        </svg></div>
    </div>
  )
}

Header.propTypes = {
  label: PropTypes.node,
}

export default Header
