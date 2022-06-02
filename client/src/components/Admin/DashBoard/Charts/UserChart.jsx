import React, { useEffect, useState } from 'react'
import axios from "axios";
axios.defaults.withCredentials = true;
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

const UsersCharts = () => {




  const [allUsers, setAllUsers] = useState();
  console.log("🚀 ~ file: UsersCharts.jsx ~ line 9 ~ UsersCharts ~ allUsers", allUsers)

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get('/api/admin/getallUsers')
        setAllUsers(res.data.users)
      } catch (error) {
        console.log("🚀 ~ file: UsersCharts.jsx ~ line 14 ~ getAllUsers ~ error", error)

      }
    }
    getAllUsers();
  }, [])

  let aCount = 0;
  let stdCount = 0;
  let sCount = 0;
  let pCount = 0;
  let cCount = 0;

  for (let index = 0; index < allUsers?.length; index++) {

    if (allUsers[index].role === 'admin') {
      aCount++
    } else if (allUsers[index].role === 'student') {
      stdCount++
    } else if (allUsers[index].role === 'supervisor') {
      sCount++
    } else if (allUsers[index].role === 'coSupervisor') {
      cCount++
    } else if (allUsers[index].role === 'panelMember') {
      pCount++
    }
  }

  const data = [
    {
      "name": "Admin",
      "count": aCount,

    },
    {
      "name": "Students",
      "count": stdCount,

    },
    {
      "name": "Supervisors",
      "count": sCount,

    },
    {
      "name": "Co Supervisors",
      "count": cCount,

    },
    {
      "name": "Panal members",
      "count": pCount,

    },

  ];



  
  
    
    
 



  return (
    <>
      <div>Users Charts : Registered Users Count is {allUsers?.length}</div>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </>
  )
}

export default UsersCharts