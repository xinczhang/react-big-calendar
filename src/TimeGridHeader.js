import PropTypes from 'prop-types'
import clsx from 'clsx'
import scrollbarSize from 'dom-helpers/scrollbarSize'
import React from 'react'

import DateContentRow from './DateContentRow'
import Header from './Header'
import ResourceHeader from './ResourceHeader'
import { notify } from './utils/helpers'
import { inRange } from './utils/eventLevels'
import { startOf, endOf } from './utils/dates'
class TimeGridHeader extends React.Component {
  handleHeaderClick = (date, view, e) => {
    e.preventDefault()
    notify(this.props.onDrillDown, [date, view])
  }

  renderHeaderCells(range) {
    let {
      currentDate,
      allEvents,
      accessors,
      localizer,
      getDrilldownView,
      getNow,
      getters: { dayProp },
      components: { header: HeaderComponent = Header },
    } = this.props

    const today = getNow()
    const chinese_week = {'Sun':'日','Mon':'一','Tue':'二 ','Wed':'三','Thu':'四','Fri':'五','Sat':'六'};
    return range.map((date, i) => {
      let drilldownView = getDrilldownView(date)
      let labels = localizer.format(date, 'dayFormat').split(' ');
      let label = labels[0]
      let chinese_label = chinese_week[labels[1]];
      let has_event = false;
     
      allEvents.forEach((event) => {
        if (inRange(event, startOf(date, 'day'), endOf(date, 'day'), accessors, localizer)) {
          has_event = true;
          console.log(event, startOf(date, 'day'),endOf(date, 'day'));
        }
      });

      const { className, style } = dayProp(date)

      let header = (
        <HeaderComponent date={date} label={label} chinese_label={chinese_label} has_event={has_event} localizer={localizer} />
      )

      return (
        <div
          key={i}
          style={style}
          className={clsx(
            'rbc-header',
            className,
            localizer.isSameDate(date, currentDate) && 'rbc-selected-header',
            !localizer.isSameDate(date, currentDate) && localizer.isSameDate(date, today) && 'rbc-today-header'
          )}
        >
          {drilldownView ? (
            <button
              type="button"
              className="rbc-button-link"
              onClick={e => this.handleHeaderClick(date, drilldownView, e)}
            >
              {header}
            </button>
          ) : (
            <span>{header}</span>
          )}
        </div>
      )
    })
  }
  renderRow = (resource) => {
    let {
      events,
      rtl,
      selectable,
      getNow,
      range,
      getters,
      localizer,
      accessors,
      components,
      resizable,
    } = this.props

    const resourceId = accessors.resourceId(resource)
    let eventsToDisplay = resource
      ? events.filter((event) => accessors.resource(event) === resourceId)
      : events

    return (
      <DateContentRow
        isAllDay
        rtl={rtl}
        getNow={getNow}
        minRows={2}
        range={range}
        events={eventsToDisplay}
        resourceId={resourceId}
        className="rbc-allday-cell"
        selectable={selectable}
        selected={this.props.selected}
        components={components}
        accessors={accessors}
        getters={getters}
        localizer={localizer}
        onSelect={this.props.onSelectEvent}
        onDoubleClick={this.props.onDoubleClickEvent}
        onKeyPress={this.props.onKeyPressEvent}
        onSelectSlot={this.props.onSelectSlot}
        longPressThreshold={this.props.longPressThreshold}
        resizable={resizable}
      />
    )
  }

  render() {
    let {
      width,
      rtl,
      resources,
      range,
      events,
      getNow,
      accessors,
      selectable,
      components,
      getters,
      scrollRef,
      localizer,
      isOverflowing,
      components: {
        timeGutterHeader: TimeGutterHeader,
        resourceHeader: ResourceHeaderComponent = ResourceHeader,
      },
      resizable,
    } = this.props

    let style = {}
    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] = `${scrollbarSize()}px`
    }

    const groupedEvents = resources.groupEvents(events)

    return (
      <div
        style={style}
        ref={scrollRef}
        className={clsx('rbc-time-header', isOverflowing && 'rbc-overflowing')}
      >
        <div
          className="rbc-label rbc-time-header-gutter"
          style={{ width, minWidth: width, maxWidth: width }}
        >
          {TimeGutterHeader && <TimeGutterHeader />}
        </div>

        {resources.map(([id, resource], idx) => (
          <div className="rbc-time-header-content" key={id || idx}>
            {resource && (
              <div className="rbc-row rbc-row-resource" key={`resource_${idx}`}>
                <div className="rbc-header">
                  <ResourceHeaderComponent
                    index={idx}
                    label={accessors.resourceTitle(resource)}
                    resource={resource}
                  />
                </div>
              </div>
            )}
            <div
              className={`rbc-row rbc-time-header-cell${
                range.length <= 1 ? ' rbc-time-header-cell-single-day' : ''
              }`}
            >
              {this.renderHeaderCells(range)}
            </div>
            
          </div>
        ))}
      </div>
    )
  }
}

TimeGridHeader.propTypes = {
  range: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  resources: PropTypes.object,
  getNow: PropTypes.func.isRequired,
  isOverflowing: PropTypes.bool,

  rtl: PropTypes.bool,
  resizable: PropTypes.bool,
  width: PropTypes.number,

  localizer: PropTypes.object.isRequired,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  onSelectSlot: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  getDrilldownView: PropTypes.func.isRequired,
  scrollRef: PropTypes.any,
}

export default TimeGridHeader
