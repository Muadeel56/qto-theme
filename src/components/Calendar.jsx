import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/calendar.css';

const Calendar = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  highlightedDates = [],
  events = {},
  attendanceData = {},
  showWeekNumbers = false,
  firstDayOfWeek = 0,
  className = '',
  variant = 'default', // 'default', 'compact', 'large', 'mobile'
  showEventDots = true,
  showEventText = false,
  ...props
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [isDesktop, setIsDesktop] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const reorderedWeekdays = [...weekdays.slice(firstDayOfWeek), ...weekdays.slice(0, firstDayOfWeek)];

  // Responsive detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isSameDay = (date1, date2) => {
    return date1?.toDateString() === date2?.toDateString();
  };

  const isDateDisabled = (date) => {
    const dateStr = formatDate(date);
    
    if (minDate && dateStr < minDate) return true;
    if (maxDate && dateStr > maxDate) return true;
    if (disabledDates.includes(dateStr)) return true;
    
    return false;
  };

  const isDateHighlighted = (date) => {
    const dateStr = formatDate(date);
    return highlightedDates.includes(dateStr);
  };

  const getDateEventInfo = (date) => {
    const dateStr = formatDate(date);
    return events[dateStr] || null;
  };

  const getDateAttendanceInfo = (date) => {
    const dateStr = formatDate(date);
    return attendanceData[dateStr] || null;
  };

  const getDateStatus = (date) => {
    const eventInfo = getDateEventInfo(date);
    const attendanceInfo = getDateAttendanceInfo(date);
    
    if (attendanceInfo) {
      return attendanceInfo.status;
    }
    
    if (eventInfo) {
      return eventInfo.type;
    }
    
    return null;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() - firstDayOfWeek + 7) % 7;

    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const date = new Date(year, month - 1, day);
      const eventInfo = getDateEventInfo(date);
      const attendanceInfo = getDateAttendanceInfo(date);
      const status = getDateStatus(date);
      
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        isSelected: isSameDay(date, selectedDate),
        isDisabled: isDateDisabled(date),
        isHighlighted: isDateHighlighted(date),
        eventInfo,
        attendanceInfo,
        status
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const eventInfo = getDateEventInfo(date);
      const attendanceInfo = getDateAttendanceInfo(date);
      const status = getDateStatus(date);
      
      days.push({
        date,
        day,
        isCurrentMonth: true,
        isToday: isSameDay(date, new Date()),
        isSelected: isSameDay(date, selectedDate),
        isDisabled: isDateDisabled(date),
        isHighlighted: isDateHighlighted(date),
        eventInfo,
        attendanceInfo,
        status
      });
    }

    // Next month's leading days
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      const eventInfo = getDateEventInfo(date);
      const attendanceInfo = getDateAttendanceInfo(date);
      const status = getDateStatus(date);
      
      days.push({
        date,
        day,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
        isSelected: isSameDay(date, selectedDate),
        isDisabled: isDateDisabled(date),
        isHighlighted: isDateHighlighted(date),
        eventInfo,
        attendanceInfo,
        status
      });
    }

    return days;
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const handleDateClick = (dayInfo) => {
    if (dayInfo.isDisabled) return;
    
    setSelectedDate(dayInfo.date);
    onChange?.(formatDate(dayInfo.date), dayInfo);
  };

  const handleKeyDown = (event, dayInfo) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleDateClick(dayInfo);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value);
    setCurrentMonth(new Date(currentMonth.getFullYear(), newMonth));
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    setCurrentMonth(new Date(newYear, currentMonth.getMonth()));
  };

  const renderDateContent = (dayInfo) => {
    const { day, attendanceInfo, eventInfo, status, isCurrentMonth } = dayInfo;
    
    if (variant === 'large' && isDesktop && (eventInfo || attendanceInfo)) {
      return (
        <div className="qto-calendar__day-content qto-calendar__day-content--large">
          <span className="qto-calendar__day-number">{day}</span>
          <div className="qto-calendar__events-container">
            {attendanceInfo && (
              <div className={`qto-calendar__event-block qto-calendar__event-block--${attendanceInfo.status}`}>
                <span className="qto-calendar__event-title">
                  {attendanceInfo.status === 'present' ? `Present: ${attendanceInfo.workingHours}h` :
                   attendanceInfo.status === 'absent' ? 'Absent' :
                   attendanceInfo.status === 'holiday' ? 'Holiday' :
                   attendanceInfo.status === 'leave' ? 'Leave' :
                   `Partial: ${attendanceInfo.workingHours}h`}
                </span>
              </div>
            )}
            {eventInfo && (
              <div className={`qto-calendar__event-block qto-calendar__event-block--${eventInfo.type}`}>
                <span className="qto-calendar__event-title">{eventInfo.title}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div className="qto-calendar__day-content">
        <span className="qto-calendar__day-number">{day}</span>
        {showEventDots && (status || eventInfo || attendanceInfo) && (
          <div className="qto-calendar__day-indicators">
            {status && <div className={`qto-calendar__status-indicator qto-calendar__status--${status}`} />}
            {variant !== 'compact' && attendanceInfo?.workingHours && (
              <div className="qto-calendar__hours-indicator" title={`${attendanceInfo.workingHours}h worked`}>
                {variant === 'mobile' ? '' : `${attendanceInfo.workingHours}h`}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const days = getDaysInMonth(currentMonth);
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getCalendarClasses = () => {
    const baseClasses = ['qto-calendar'];
    
    if (variant === 'compact') baseClasses.push('qto-calendar--compact');
    if (variant === 'large') baseClasses.push('qto-calendar--large');
    if (variant === 'mobile') baseClasses.push('qto-calendar--mobile');
    
    if (className) baseClasses.push(className);
    
    return baseClasses.join(' ');
  };

  return (
    <div 
      className={getCalendarClasses()}
      role="grid"
      aria-label="Calendar"
      {...props}
    >
      <div className="qto-calendar__header">
        <button
          type="button"
          className="qto-calendar__nav-button"
          onClick={handlePrevMonth}
          aria-label="Previous month"
          title="Previous month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>

        <div className="qto-calendar__header-selects">
          <select
            value={currentMonth.getMonth()}
            onChange={handleMonthChange}
            className="qto-calendar__month-select"
            aria-label="Select month"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {variant === 'compact' ? month.slice(0, 3) : month}
              </option>
            ))}
          </select>

          <select
            value={currentMonth.getFullYear()}
            onChange={handleYearChange}
            className="qto-calendar__year-select"
            aria-label="Select year"
          >
            {Array.from({ length: 21 }, (_, i) => {
              const year = new Date().getFullYear() - 10 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="button"
          className="qto-calendar__nav-button"
          onClick={handleNextMonth}
          aria-label="Next month"
          title="Next month"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </button>
      </div>

      <div className="qto-calendar__grid">
        <div className="qto-calendar__weekdays" role="row">
          {showWeekNumbers && (
            <div className="qto-calendar__weekday qto-calendar__week-number-header" role="columnheader">
              {variant === 'compact' ? 'W' : 'Wk'}
            </div>
          )}
          {reorderedWeekdays.map((weekday) => (
            <div key={weekday} className="qto-calendar__weekday" role="columnheader">
              {variant === 'compact' || variant === 'mobile' ? weekday.charAt(0) : weekday}
            </div>
          ))}
        </div>

        <div className="qto-calendar__weeks">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="qto-calendar__week" role="row">
              {showWeekNumbers && (
                <div className="qto-calendar__week-number" role="gridcell">
                  {getWeekNumber(week[0].date)}
                </div>
              )}
              {week.map((dayInfo, dayIndex) => {
                const dayClasses = [
                  'qto-calendar__day',
                  dayInfo.isCurrentMonth ? 'qto-calendar__day--current' : 'qto-calendar__day--other',
                  dayInfo.isToday ? 'qto-calendar__day--today' : '',
                  dayInfo.isSelected ? 'qto-calendar__day--selected' : '',
                  dayInfo.isDisabled ? 'qto-calendar__day--disabled' : '',
                  dayInfo.isHighlighted ? 'qto-calendar__day--highlighted' : '',
                  dayInfo.status ? `qto-calendar__day--${dayInfo.status}` : '',
                ].filter(Boolean).join(' ');

                const ariaLabel = [
                  dayInfo.date.toDateString(),
                  dayInfo.isSelected ? '(selected)' : '',
                  dayInfo.isToday ? '(today)' : '',
                  dayInfo.status ? `(${dayInfo.status})` : '',
                  dayInfo.attendanceInfo?.workingHours ? `(${dayInfo.attendanceInfo.workingHours} hours worked)` : ''
                ].filter(Boolean).join(' ');

                return (
                  <button
                    key={dayIndex}
                    type="button"
                    className={dayClasses}
                    onClick={() => handleDateClick(dayInfo)}
                    onKeyDown={(e) => handleKeyDown(e, dayInfo)}
                    disabled={dayInfo.isDisabled}
                    role="gridcell"
                    aria-label={ariaLabel}
                    aria-selected={dayInfo.isSelected}
                    aria-current={dayInfo.isToday ? 'date' : undefined}
                    tabIndex={dayInfo.isSelected || (dayIndex === 0 && weekIndex === 0 && !selectedDate) ? 0 : -1}
                    title={`${dayInfo.date.toDateString()}${dayInfo.attendanceInfo ? ` - ${dayInfo.attendanceInfo.status}` : ''}`}
                  >
                    {renderDateContent(dayInfo)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  disabledDates: PropTypes.arrayOf(PropTypes.string),
  highlightedDates: PropTypes.arrayOf(PropTypes.string),
  events: PropTypes.object,
  attendanceData: PropTypes.object,
  showWeekNumbers: PropTypes.bool,
  firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'compact', 'large', 'mobile']),
  showEventDots: PropTypes.bool,
  showEventText: PropTypes.bool,
};

export default Calendar;
