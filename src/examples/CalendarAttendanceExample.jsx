import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import '../examples/Demo.css';

const CalendarAttendanceExample = () => {
  const [selectedDate, setSelectedDate] = useState('2025-07-24');
  const [isCompact, setIsCompact] = useState(false);

  // Sample attendance data for July 2025
  const attendanceData = {
    '2025-07-01': { status: 'present', workingHours: 8, bufferHours: 0.5 },
    '2025-07-02': { status: 'present', workingHours: 7.5, bufferHours: 1 },
    '2025-07-03': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-04': { status: 'holiday', workingHours: 0, bufferHours: 0 },
    '2025-07-05': { status: 'absent', workingHours: 0, bufferHours: 0 },
    '2025-07-07': { status: 'present', workingHours: 6, bufferHours: 2 },
    '2025-07-08': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-09': { status: 'present', workingHours: 7, bufferHours: 1 },
    '2025-07-10': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-11': { status: 'present', workingHours: 8.5, bufferHours: 0 },
    '2025-07-12': { status: 'leave', workingHours: 0, bufferHours: 0 },
    '2025-07-14': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-15': { status: 'present', workingHours: 7.5, bufferHours: 0.5 },
    '2025-07-16': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-17': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-18': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-21': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-22': { status: 'present', workingHours: 7, bufferHours: 1 },
    '2025-07-23': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-24': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-25': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-28': { status: 'partial', workingHours: 4, bufferHours: 0 },
    '2025-07-29': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-30': { status: 'present', workingHours: 8, bufferHours: 0 },
    '2025-07-31': { status: 'present', workingHours: 8, bufferHours: 0 },
  };

  // Sample events data
  const events = {
    '2025-07-15': { type: 'event', title: 'Team Meeting', time: '10:00 AM' },
    '2025-07-20': { type: 'event', title: 'Project Deadline', time: 'All Day' },
    '2025-07-25': { type: 'event', title: 'Performance Review', time: '2:00 PM' },
  };

  const handleDateChange = (date, dayInfo) => {
    setSelectedDate(date);
    console.log('Selected date:', date, 'Day info:', dayInfo);
  };

  const getAttendanceStats = () => {
    const stats = {
      present: 0,
      absent: 0,
      holiday: 0,
      leave: 0,
      partial: 0,
      totalHours: 0,
    };

    Object.values(attendanceData).forEach(data => {
      stats[data.status] += 1;
      stats.totalHours += data.workingHours;
    });

    return stats;
  };

  const stats = getAttendanceStats();
  const selectedDayInfo = attendanceData[selectedDate];

  return (
    <div className="demo-section">
      <div className="demo-header">
        <h2>Calendar with Attendance Data</h2>
        <p>A fully responsive calendar component with attendance tracking, events, and working hours display.</p>
      </div>

      <div className="demo-controls">
        <label className="demo-control">
          <input
            type="checkbox"
            checked={isCompact}
            onChange={(e) => setIsCompact(e.target.checked)}
          />
          Compact Mode
        </label>
      </div>

      <div className="demo-grid">
        <div className="demo-content">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            padding: '20px',
            minHeight: '400px',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              attendanceData={attendanceData}
              events={events}
              compact={isCompact}
              showEventDots={true}
              className="attendance-calendar"
            />
          </div>
        </div>

        <div className="demo-info">
          <h3>Attendance Overview</h3>
          <div className="attendance-stats">
            <div className="stat-item stat-present">
              <span className="stat-label">Present Days</span>
              <span className="stat-value">{stats.present}</span>
            </div>
            <div className="stat-item stat-absent">
              <span className="stat-label">Absent Days</span>
              <span className="stat-value">{stats.absent}</span>
            </div>
            <div className="stat-item stat-holiday">
              <span className="stat-label">Holidays</span>
              <span className="stat-value">{stats.holiday}</span>
            </div>
            <div className="stat-item stat-leave">
              <span className="stat-label">Leave Days</span>
              <span className="stat-value">{stats.leave}</span>
            </div>
            <div className="stat-item stat-partial">
              <span className="stat-label">Partial Days</span>
              <span className="stat-value">{stats.partial}</span>
            </div>
            <div className="stat-item stat-hours">
              <span className="stat-label">Total Hours</span>
              <span className="stat-value">{stats.totalHours}h</span>
            </div>
          </div>

          {selectedDayInfo && (
            <div className="selected-day-info">
              <h4>Selected Day: {new Date(selectedDate).toDateString()}</h4>
              <div className="day-details">
                <p><strong>Status:</strong> <span className={`status-${selectedDayInfo.status}`}>{selectedDayInfo.status.charAt(0).toUpperCase() + selectedDayInfo.status.slice(1)}</span></p>
                <p><strong>Working Hours:</strong> {selectedDayInfo.workingHours}h</p>
                <p><strong>Buffer Hours:</strong> {selectedDayInfo.bufferHours}h</p>
              </div>
            </div>
          )}

          <div className="legend">
            <h4>Status Legend</h4>
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
                <span>Partial</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-responsive-test">
        <h3>Responsive Test</h3>
        <p>Resize your browser window to see how the calendar adapts to different screen sizes:</p>
        <ul>
          <li><strong>Desktop (1024px+):</strong> Full size with all details</li>
          <li><strong>Tablet (768px-1024px):</strong> Medium size with optimized spacing</li>
          <li><strong>Mobile (320px-768px):</strong> Compact size with flexible grid</li>
          <li><strong>Small Mobile (&lt;480px):</strong> Minimal size with essential info only</li>
        </ul>
      </div>
    </div>
  );
};

export default CalendarAttendanceExample;
