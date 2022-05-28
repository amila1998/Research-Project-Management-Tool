import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './topic.scss';
axios.defaults.withCredentials = true;
const TopicDetails = ({topic,group}) => {
    console.log(topic);
    console.log(group);
    
  return (
    <>
    <h1>Topic Details</h1>
    <br/>
    <div className='display'>
      <div className='row1'>
        <div className='col1 bold'>Topic ID : </div>
        <div className='col1'>{topic._id}</div>
      </div>
      <div className='row1'>
        <div className='col1 bold'>Topic Name : </div>
        <div className='col1'>{topic.topicname}</div>
      </div>
      <div className='row1'>
        <div className='col1 bold'>Panal Member Acception :</div>
        <div className='col1'>{topic.panalMemberAcception===null?"Pending"
    :topic.panalMemberAcception===false?"Rejected"
    :topic.panalMemberAcception===true?"Accepted":""}</div>
      </div>
      <div className='row1'>
        <div className='col1 bold'>Topic Description :</div>
        <div className='col1'>{topic.topicDescribe}</div>
      </div>
      <div className='row1'>
        <div className='col1 bold'>Related Topics :</div>
        {topic.interestedTopics.map(items=>(
            <div key={items} className='col1'>{items}<br/></div>
        ))}
      
      </div>
      <div className='row1'>
        <div className='col1 bold'>Topic Created At :</div>
        <div className='col1 '>{new Date(topic.createdAt).toLocaleDateString()}</div>
      </div>
      <div className='row1'>
        <div className='col1 bold'>Topic Updated At :</div>
        <div className='col1'>{new Date(topic.updatedAt).toLocaleDateString()}</div>
      </div>
    

      <div className='row1'>
        <button className='btn btn-outline-success'>UPDATE</button>
      </div>
      

    </div>
    </>
  )
}

export default TopicDetails