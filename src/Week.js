import PropTypes from 'prop-types'
import React from 'react'
import { navigate } from './utils/constants'
import TimeGrid from './TimeGrid'

class Week extends React.Component {
  render() {
    /**
     * This allows us to default min, max, and scrollToTime
     * using our localizer. This is necessary until such time
     * as TimeGrid is converted to a functional component.
     */
    let {
      date,
      localizer,
      min = localizer.startOf(new Date(), 'day'),
      max = localizer.endOf(new Date(), 'day'),
      scrollToTime = localizer.startOf(new Date(), 'day'),
      enableAutoScroll = true,
      ...props
    } = this.props
    let range = Week.range(date, this.props)

    return (
      <TimeGrid
        {...props}
        range={range}
        eventOffset={15}
        localizer={localizer}
        min={min}
        max={max}
        scrollToTime={scrollToTime}
        enableAutoScroll={enableAutoScroll}
      />
    )
  }
}

Week.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.any,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
  enableAutoScroll: PropTypes.bool,
}

Week.defaultProps = TimeGrid.defaultProps

Week.navigate = (date, action, { localizer }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'day')

    case navigate.NEXT:
      return localizer.add(date, 1, 'day')

    default:
      return date
  }
}

Week.range = (date, { localizer }) => {
  let firstOfWeek = localizer.startOfWeek()
  let start = localizer.add(date, -1, 'day')
  let end = localizer.add(date, 1, 'day')

  return localizer.range(start, end)
}

Week.title = (date, { localizer }) => localizer.format(date, 'MM/YYYY')

export default Week
