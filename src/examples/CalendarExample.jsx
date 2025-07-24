import React, { useState } from 'react';
import Calendar from '../components/Calendar';

const CalendarExample = () => {
  const [selectedDate, setSelectedDate] = useState('2025-07-24');
  const [viewMode, setViewMode] = useState('attendance'); // 'basic', 'attendance', 'events'

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
    '2025-07-05': { type: 'meeting', title: 'Team Meeting' },
    '2025-07-12': { type: 'deadline', title: 'Project Deadline' },
    '2025-07-18': { type: 'event', title: 'Company Event' },
    '2025-07-24': { type: 'meeting', title: 'Client Call' },
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
    <div className="calendar-example">
      <div className="calendar-demo-header">
        <h2>Responsive Calendar Component</h2>
        <p>Interactive calendar with attendance tracking, events, and full responsive design</p>
        
        <div className="view-mode-selector">
          <button 
            className={`mode-btn ${viewMode === 'basic' ? 'active' : ''}`}
            onClick={() => setViewMode('basic')}
          >
            Basic Calendar
          </button>
          <button 
            className={`mode-btn ${viewMode === 'attendance' ? 'active' : ''}`}
            onClick={() => setViewMode('attendance')}
          >
            Attendance View
          </button>
          <button 
            className={`mode-btn ${viewMode === 'events' ? 'active' : ''}`}
            onClick={() => setViewMode('events')}
          >
            Events View
          </button>
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

        <div className="calendar-demo-grid">
          {/* Calendar Component */}
          <div className="calendar-container">
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              attendanceData={viewMode === 'attendance' ? attendanceData : {}}
              events={viewMode === 'events' ? events : {}}
              showEventDots={viewMode !== 'basic'}
              className="demo-calendar"
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
            <li><strong>Mobile First:</strong> Optimized for touch devices with larger tap targets</li>
            <li><strong>Flexible Grid:</strong> Automatically adjusts to container width</li>
            <li><strong>Compact Mode:</strong> Smaller size for limited spaces</li>
            <li><strong>Touch Friendly:</strong> Enhanced touch targets on mobile devices</li>
            <li><strong>Landscape Support:</strong> Optimized for landscape orientation</li>
            <li><strong>High DPI:</strong> Sharp indicators on retina displays</li>
            <li><strong>Container Queries:</strong> Adapts to parent container size</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarExample;
