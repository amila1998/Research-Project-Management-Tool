import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import Chat from './pages/Chat'
import './GroupChat.scss'


const GroupChat = ({group}) => {

  const { user, isCoSupervisor, isPanelMember, isSupervisor } = useContext(AuthContext);

    console.log(group);
  return (
    <>
    <h1>Group Chat</h1>
    <Chat userData={user} />
    </>
  )
}

export default GroupChat