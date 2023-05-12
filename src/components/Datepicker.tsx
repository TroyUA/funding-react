import { useEffect, useState } from 'react'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isEqual,
  isSameMonth,
  parse,
  startOfToday,
  startOfWeek,
  startOfDay,
} from 'date-fns'
import { classNames } from '../utils'

interface DatePickerProps {
  date?: Date
  format?: string
  visible?: boolean
  position?: string
  placeholder?: string
  name?: string
}

const Datepicker: React.FC<DatePickerProps> = ({
  visible = false,
  placeholder = 'Calendar',
  name = 'date',
  ...props
}) => {
  const [showList, setShowList] = useState(visible)

  const [selectedDay, setSelectedDay] = useState(props.date ? startOfDay(props.date) : undefined)
  const [currentMonth, setCurrentMonth] = useState(
    format(selectedDay || startOfToday(), 'MMM-yyyy')
  )
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', selectedDay || startOfToday())
  const newDays = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  })

  const toggleShow = () => {
    setShowList((prev) => !prev)
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }
  function previousMonth() {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'))
  }
  function selectDayHandler(day: Date) {
    setSelectedDay(day)
    setCurrentMonth(format(day, 'MMM-yyyy'))
  }

  useEffect(() => {
    setShowList(false)
  }, [selectedDay])

  return (
    <div
      className="date-picker"
      tabIndex={0}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setShowList(false)
      }}
    >
      <input type="hidden" name={name} value={selectedDay?.toString() || ''} />
      <div
        className={classNames('date-picker__value', !selectedDay && 'hidden')}
        onClick={toggleShow}
      >
        {selectedDay ? format(selectedDay, props.format || 'MMM dd, yyyy') : placeholder}
      </div>
      <div className={classNames('date-picker__dropdown', showList && 'show')}>
        <div className="date-picker__dropdown-month">
          <span>{format(firstDayCurrentMonth, 'MMMM yyyy')}</span>
          <div className="date-picker__dropdown-month-nav">
            <button type="button" onClick={previousMonth}>
              <img src="/src/img/vector.svg"></img>
            </button>
            <button type="button" onClick={nextMonth}>
              <img src="/src/img/vector.svg" style={{ transform: 'rotate(180deg)' }}></img>
            </button>
          </div>
        </div>
        <div className="date-picker__dropdown-week-days">
          <span>SU</span>
          <span>MO</span>
          <span>TU</span>
          <span>WE</span>
          <span>TH</span>
          <span>FR</span>
          <span>SA</span>
        </div>
        <div className="date-picker__dropdown-dates">
          {newDays.map((day) => (
            <button
              type="button"
              className={classNames(
                isEqual(day, selectedDay || startOfToday()) && 'selected',
                isSameMonth(day, firstDayCurrentMonth) && 'current-month'
              )}
              key={day.toString()}
              onClick={() => selectDayHandler(day)}
            >
              <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Datepicker
