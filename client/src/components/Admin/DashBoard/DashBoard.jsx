import axios from 'axios';
import React, { useEffect, useState } from 'react'
import GroupsCharts from './Charts/GroupsCharts';
import UsersCharts from './Charts/UserChart';
import './DashBoard.css';

const DashBoard = () => {
 
  
  return (
    <>
    <div className="Dash">ADMIN DashBoard</div>
    <div className='row'>
    <div className='col'>
        <UsersCharts/>
      </div>
      <div className='col'>
        <GroupsCharts/>
      </div>
    </div>
    </>
  )
}

export default DashBoard