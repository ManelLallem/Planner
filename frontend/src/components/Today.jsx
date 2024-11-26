import React from 'react';
import DailyTasks from './DailyTasks';
import { useState } from 'react';

function Today({id}) {
  const [date,setDate]=useState(new Date())
  const title="Today"
  return (
    <div>
      <DailyTasks id={id} date={date} title={title}/>
    </div>
  );
}

export default Today;