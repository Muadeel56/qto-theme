import React, { useState } from 'react';
import Calendar from '../components/Calendar';

const CalendarExample = () => {
  const [selectedDate, setSelectedDate] = useState('2025-07-24');
  const [viewMode, setViewMode] = useState('attendance'); // 'basic', 'attendance', 'events'
  const [calendarVariant, setCalendarVariant] = useState('default'); // 'default', 'compact', 'large', 'mobile'

  // Sample attendance data for demo
  const attendanceData = {
    '2025-07-01': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-02': { status: 'present', workingHours: 7.5, bufferHours: 0.5 },
    '2025-07-03': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-04': { status: 'holiday', workingHours: 0, bufferHours: 0 },
    '2025-07-05': { status: 'present', workingHours: 6, bufferHours: 2 },
    '2025-07-08': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-09': { status: 'absent', workingHours: 0, bufferHours: 0 },
    '2025-07-10': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-11': { status: 'leave', workingHours: 0, bufferHours: 0 },
    '2025-07-12': { status: 'present', workingHours: 4, bufferHours: 0 },
    '2025-07-15': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-16': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-17': { status: 'present', workingHours: 7, bufferHours: 1 },
    '2025-07-18': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-19': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-22': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-23': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-24': { status: 'present', workingHours: 6, bufferHours: 2 },
    '2025-07-25': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-26': { status: 'present', workingHours: 8, bufferHours: 0 },
  };

  // Sample events data
  const events = {
    '2025-07-01': { type: 'meeting', title: 'Sprint Planning' },
    '2025-07-03': { type: 'work', title: 'Code Review' },
    '2025-07-05': { type: 'meeting', title: 'Team Meeting' },
    '2025-07-08': { type: 'personal', title: 'Training Session' },
    '2025-07-10': { type: 'meeting', title: 'Weekly Standup' },
    '2025-07-12': { type: 'deadline', title: 'Project Deadline' },
    '2025-07-15': { type: 'work', title: 'Feature Development' },
    '2025-07-17': { type: 'meeting', title: 'Client Presentation' },
    '2025-07-18': { type: 'work', title: 'Company Event' },
    '2025-07-22': { type: 'meeting', title: 'Retrospective' },
    '2025-07-24': { type: 'meeting', title: 'Client Call' },
    '2025-07-25': { type: 'personal', title: 'Performance Review' },
    '2025-07-29': { type: 'deadline', title: 'Release Deployment' },
    '2025-07-31': { type: 'work', title: 'Documentation Update' },
  };

  const handleDateChange = (date, dayInfo) => {
    setSelectedDate(date);
    console.log('Selected date:', date, dayInfo);
  };

  const getStats = () => {
    const stats = {
      present: 0,
      absent: 0,
      holiday: 0,
      leave: 0,
      totalHours: 0,
    };

    Object.values(attendanceData).forEach(data => {
      stats[data.status]++;
      stats.totalHours += data.workingHours;
    });

    return stats;
  };

  const stats = getStats();
  const selectedDayData = attendanceData[selectedDate];
  const selectedDayEvent = events[selectedDate];

  return (
    <div className={`calendar-example ${calendarVariant === 'large' ? 'large-calendar-demo' : ''}`}>
      <div className="calendar-demo-header">
        <h2>📅 Responsive Calendar Component</h2>
        <p>Multi-variant calendar with attendance tracking, events, and full responsive design</p>
        
        <div className="calendar-controls">
          <div className="control-group">
            <label>View Mode:</label>
            <div className="view-mode-selector">
              <button 
                className={`mode-btn ${viewMode === 'basic' ? 'active' : ''}`}
                onClick={() => setViewMode('basic')}
              >
                Basic
              </button>
              <button 
                className={`mode-btn ${viewMode === 'attendance' ? 'active' : ''}`}
                onClick={() => setViewMode('attendance')}
              >
                Attendance
              </button>
              <button 
                className={`mode-btn ${viewMode === 'events' ? 'active' : ''}`}
                onClick={() => setViewMode('events')}
              >
                Events
              </button>
            </div>
          </div>

          <div className="control-group">
            <label>Calendar Size:</label>
            <div className="variant-selector">
              <button 
                className={`variant-btn ${calendarVariant === 'compact' ? 'active' : ''}`}
                onClick={() => setCalendarVariant('compact')}
              >
                📱 Compact
              </button>
              <button 
                className={`variant-btn ${calendarVariant === 'default' ? 'active' : ''}`}
                onClick={() => setCalendarVariant('default')}
              >
                💻 Default
              </button>
              <button 
                className={`variant-btn ${calendarVariant === 'large' ? 'active' : ''}`}
                onClick={() => setCalendarVariant('large')}
              >
                🖥️ Large
              </button>
              <button 
                className={`variant-btn ${calendarVariant === 'mobile' ? 'active' : ''}`}
                onClick={() => setCalendarVariant('mobile')}
              >
                📲 Mobile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="calendar-demo-container">
        {/* Statistics Panel */}
        {viewMode === 'attendance' && (
          <div className="attendance-stats">
            <div className="stat-item stat-present">
              <div className="stat-label">Present Days</div>
              <div className="stat-value">{stats.present}</div>
            </div>
            <div className="stat-item stat-absent">
              <div className="stat-label">Absent Days</div>
              <div className="stat-value">{stats.absent}</div>
            </div>
            <div className="stat-item stat-holiday">
              <div className="stat-label">Holidays</div>
              <div className="stat-value">{stats.holiday}</div>
            </div>
            <div className="stat-item stat-leave">
              <div className="stat-label">Leave Days</div>
              <div className="stat-value">{stats.leave}</div>
            </div>
            <div className="stat-item stat-hours">
              <div className="stat-label">Total Hours</div>
              <div className="stat-value">{stats.totalHours}h</div>
            </div>
          </div>
        )}

        <div className={`calendar-demo-grid ${calendarVariant === 'large' ? 'large-calendar-layout' : ''}`}>
          {/* Calendar Component */}
          <div className="calendar-container">
            <div className="calendar-variant-label">
              <span className="variant-badge">{calendarVariant.charAt(0).toUpperCase() + calendarVariant.slice(1)} Calendar</span>
            </div>
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              attendanceData={viewMode === 'attendance' ? attendanceData : {}}
              events={viewMode === 'events' ? events : {}}
              showEventDots={viewMode !== 'basic'}
              showEventText={calendarVariant === 'large'}
              variant={calendarVariant}
              className={`demo-calendar ${calendarVariant === 'large' ? 'large-calendar' : ''}`}
              showWeekNumbers={false}
            />
          </div>

          {/* Selected Day Info */}
          <div className="selected-day-info">
            <h4>Selected Date: {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</h4>
            
            {selectedDayData && (
              <div className="day-details">
                <p>Status: <span className={`status-${selectedDayData.status}`}>
                  {selectedDayData.status.charAt(0).toUpperCase() + selectedDayData.status.slice(1)}
                </span></p>
                <p>Working Hours: {selectedDayData.workingHours}h</p>
                {selectedDayData.bufferHours > 0 && (
                  <p>Buffer Hours: {selectedDayData.bufferHours}h</p>
                )}
              </div>
            )}

            {selectedDayEvent && (
              <div className="day-details">
                <p>Event: <strong>{selectedDayEvent.title}</strong></p>
                <p>Type: {selectedDayEvent.type.charAt(0).toUpperCase() + selectedDayEvent.type.slice(1)}</p>
              </div>
            )}

            {!selectedDayData && !selectedDayEvent && (
              <p>No data available for this date.</p>
            )}

            <div className="variant-info">
              <h5>Current Variant Features:</h5>
              <ul>
                {calendarVariant === 'compact' && (
                  <>
                    <li>✅ Minimal space usage</li>
                    <li>✅ Single letter weekdays</li>
                    <li>✅ Smaller touch targets</li>
                  </>
                )}
                {calendarVariant === 'default' && (
                  <>
                    <li>✅ Balanced size and features</li>
                    <li>✅ Good for most use cases</li>
                    <li>✅ Standard touch targets</li>
                  </>
                )}
                {calendarVariant === 'large' && (
                  <>
                    <li>✅ Larger touch targets</li>
                    <li>✅ Event text display</li>
                    <li>✅ Enhanced accessibility</li>
                  </>
                )}
                {calendarVariant === 'mobile' && (
                  <>
                    <li>✅ Auto-responsive sizing</li>
                    <li>✅ Optimized for touch</li>
                    <li>✅ Container-based scaling</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="legend">
          <h4>Legend</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color legend-present"></div>
              <span>Present</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-absent"></div>
              <span>Absent</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-holiday"></div>
              <span>Holiday</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-leave"></div>
              <span>Leave</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-partial"></div>
              <span>Partial Day</span>
            </div>
          </div>
        </div>

        {/* Responsive Test Info */}
        <div className="demo-responsive-test">
          <h3>📱 Responsive Features</h3>
          <ul>
            <li><strong>Multi-Variant Support:</strong> Choose between compact, default, large, and mobile variants</li>
            <li><strong>Auto-Responsive:</strong> Mobile variant automatically adjusts to container width</li>
            <li><strong>Touch Optimized:</strong> Enhanced touch targets on mobile devices</li>
            <li><strong>Flexible Grid:</strong> CSS Grid with aspect-ratio for perfect squares</li>
            <li><strong>Event Display:</strong> Large variant shows event text, others show indicators</li>
            <li><strong>Accessibility:</strong> Full keyboard navigation and screen reader support</li>
            <li><strong>Theme Aware:</strong> Adapts to light/dark themes automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarExample;
