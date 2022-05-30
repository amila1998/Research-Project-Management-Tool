import React from 'react'
import UserDetails from '../../utils/ViewUser/UserDetails'
import './groupDetails.scss'
const StudentGroupDetails = ({groupData}) => {
  return (
      <>
      <div className='GDtopic'>{groupData.groupName.toUpperCase()} GROUP DETAILS</div>
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
        </div>
        <br></br>

        
        <div>
        <table>
    <thead>
        <tr>
            <th>User ID</th>
            <th>Member Name</th>
            <th>Role</th>
            <th>Format</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        {
           groupData.members.map(items => (
          
                <tr key={items.user_id}>
                         {console.log(items)}
                    <td>{items.user_id}</td>
                    <td><UserDetails member={items}/></td>
                    <td>{items.isLeader?"Leader":"Memeber"}</td>
                    <td></td>
                    <td></td>
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