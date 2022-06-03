import React from 'react'
import UserDetails from '../../utils/ViewUser/UserDetails'
import './groupDetails.scss'
const StudentGroupDetails = ({groupData}) => {
  return (
      <>
      <div className='GDtopic Dash'>{groupData.groupName.toUpperCase()} <div className="Dash"> <h1>Group DETAILS</h1></div></div>
        <div>Your Group level is {groupData.level}</div>
        <div className='steps'>
            <span className="line-1"></span>
            <span className="line-2"></span>
            <span className="line-3"></span>
            <span className="line-4"></span>
            <span className="line-5"></span>
            <span className="line-6"></span>
            {groupData.level===0&&<><div  className='nextStep'>Next Step:  Register Your Topic under the Topic Registraion</div></>}
            {groupData.level===1&&<><div className='nextStep'>Next Step: Request a Supervisor</div></>}
            {groupData.level===2&&<><div className='warnStep'>Wait for the Supervisor Response.</div></>}
            {groupData.level===-1&&<><div className='backStep'>Please Try another Supervisor</div></>}
            {groupData.level===3&&<><div className='warnStep'>Wait for the Topic Acception a from Topic Evaluvation Panal Member</div></>}
            {groupData.level===-2&&<><div className='backStep'>Please Try another Topic</div></>}
            {groupData.level===4&&<><div className='nextStep'>Next Step: Request a Co Supervisor</div></>}
            {groupData.level===5&&<><div className='warnStep'>Wait for the Co Supervisor Response.</div></>}
            {groupData.level===-3&&<><div className='backStep'>Please Try another Co Supervisor</div></>}
            {groupData.level===6&&<><div className='warnStep'>Wait for Assigning the Panal Member from Admin.</div></>}
            {groupData.level===7&&<><div className='nextStep'>COOL !!! , Finally Your Group is Complete all Task. Now you can Submit your Submission before the Deadline</div></>}
        </div>
        <br></br>

        
        <div className='table-page'>
        <table>
    <thead>
        <tr>
            <th>User ID</th>
            <th>Member Name</th>
            <th>Role</th>
            
        </tr>
    </thead>
    <tbody>
        {
           groupData.members.map(items => (
          
                <tr key={items.user_id}>
                    <td>{items.user_id}</td>
                    <td><UserDetails member={items}/></td>
                    <td>{items.isLeader?"Leader":"Memeber"}</td>
    
                </tr>
            ))
        }
    </tbody>
</table>


</div>
        
      

        {groupData.level===0&&<>
        <br/>
        <button className='btn btn-outline-danger'>DELETE GROUP</button>
        
        </>}
      
      
      </>

  )
}

export default StudentGroupDetails