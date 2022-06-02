import React, { useEffect, useState } from 'react'
import axios from "axios";
axios.defaults.withCredentials = true;
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

const GroupsCharts = () => {

    const [allGroups,setAllGroups]=useState();
    console.log("🚀 ~ file: GroupsCharts.jsx ~ line 9 ~ GroupsCharts ~ allGroups", allGroups)

    useEffect(() => {
      const getAllGroups=async()=>{
        try {
          const res = await axios.get('/api/admin/getallGroups')
          setAllGroups(res.data)
        } catch (error) {
        console.log("🚀 ~ file: GroupsCharts.jsx ~ line 14 ~ getAllGroups ~ error", error)
          
        }
      }
      getAllGroups();
    }, [])
    

  return (
    <>
    <div>Groups Charts : Registered Group Count is {allGroups?.length}</div>
    <AreaChart width={730} height={250} data={allGroups}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="level" />
  <YAxis />
  <CartesianGrid strokeDasharray="3 3" />
  <Tooltip />
  <Area type="monotone" dataKey="groupName" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
  <Area type="monotone" dataKey="level" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
</AreaChart>
    </>
  )
}

export default GroupsCharts