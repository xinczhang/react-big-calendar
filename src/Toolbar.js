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
            周
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
