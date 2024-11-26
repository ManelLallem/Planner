import React, { useState } from 'react';
import './calendar.css'; 
import DailyTasks from './DailyTasks';

const Calendar = ({id}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const[calendarFlag,setCalendarFlag]=useState(true)

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = Array(firstDayOfMonth).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    if (!day) return; // Ignore empty cells

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const clickedDate = new Date(year, month, day);

    setSelectedDate(clickedDate);
    console.log('Selected Date:', clickedDate.toDateString());
    setCalendarFlag(false)

  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day &&
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  const formattedMonthYear = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
  
  return ( <>
   {calendarFlag ? (
  <div className="calendar">
    <div className="calendar-header">
      <button onClick={handlePrevMonth}>❮</button>
      <h2>{formattedMonthYear}</h2>
      <button onClick={handleNextMonth}>❯</button>
    </div>
    <div className="calendar-body">
      <div className="days-of-week">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {generateCalendarDays().map((day, index) => (
          <div
            key={index}
            className={`day ${day ? (isToday(day) ? 'today' : '') : 'empty'}`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  </div>
) : selectedDate ? (
  <div>
    <DailyTasks id={id} date={selectedDate} title={selectedDate.toDateString()}/>
  </div>
) : ""}

    
  </>
   
    
  );
};

export default Calendar;
