import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const MyCalander=()=> {
  const [today, setToday] = useState(new Date());
  
const onActiveStartDateChange =()=>{
  setToday(today)
}


  return (
    <div>
      <Calendar showWeekNumbers  onActiveStartDateChange={onActiveStartDateChange} value={today} />
    </div>
  );
}

export default MyCalander;