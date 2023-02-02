import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'
import { navigate } from './utils/constants'

class Toolbar extends React.Component {
  render() {
    let {
      localizer: { messages },
      label,
    } = this.props

    return (
      <div className="rbc-toolbar">
        <span className="rbc-toolbar-label">{label}</span>
        <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            &gt;
          </button>
        <span className="rbc-btn-group">
          
        </span>
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            今天
          </button>
          <button
            type="button"
            key="week"
            className={clsx({ 'rbc-active': this.props.view === "week" })}
            onClick={this.view.bind(null, "week")}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_36_109)">
                <path d="M39 7.5H9C8.17157 7.5 7.5 8.17157 7.5 9V39C7.5 39.8284 8.17157 40.5 9 40.5H39C39.8284 40.5 40.5 39.8284 40.5 39V9C40.5 8.17157 39.8284 7.5 39 7.5Z" class="weekpath" stroke="#C0C6D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M33 4.5V10.5" class="weekpath" stroke="#C0C6D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 4.5V10.5" class="weekpath" stroke="#C0C6D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.5 16.5H40.5" class="weekpath" stroke="#C0C6D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.5 25.5H23.5" class="weekpath" stroke="#C0C6D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.5 31.5H31.5" class="weekpath" stroke="#C0C6D1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <clipPath id="clip0_36_109">
                <rect width="48" height="48" fill="white"/>
              </clipPath>
              </defs>
            </svg>

          </button>
        </span>
      </div>
    )
  }

  navigate = (action) => {
    this.props.onNavigate(action)
  }

  view = (view) => {
    this.props.onView(view)
  }

  
}

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default Toolbar
