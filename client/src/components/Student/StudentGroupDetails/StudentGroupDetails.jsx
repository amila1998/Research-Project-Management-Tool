import React from 'react'
import UserDetails from '../../utils/ViewUser/UserDetails'
import './groupDetails.scss'
const StudentGroupDetails = ({groupData}) => {
  return (
      <>
      <div className='GDtopic'>{groupData.groupName.toUpperCase()} GROUP DETAILS</div>
        <div>Your Group level is {groupData.level+1}. You have to complete few more task.</div>
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