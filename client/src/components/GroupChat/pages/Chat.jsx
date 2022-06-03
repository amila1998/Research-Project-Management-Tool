import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
// import { AuthContext } from "../../../context/AuthContext";

axios.defaults.withCredentials = true;

export default function Chat({userData}) {
    // const navigate = useNavigate();
    
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    

    

    useEffect(() => {
        setCurrentUser(
            userData
        );
    }, []); 
    
    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser]);

    useEffect( () => {
        const getAllusers = async () => {
            if (currentUser) {
                if (currentUser.logo) {
                    const data = await axios.get(`${allUsersRoute}`);
                    setContacts(data.data);
                }
            }
        }
        getAllusers();
    }, [currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <>
            <Container>
                <div className="container">
                    <Contacts userData={userData} contacts={contacts} changeChat={handleChatChange} />
                    {currentChat === undefined ? (
                        <Welcome userData={userData} />
                    ) : (
                            <ChatContainer userData={userData} currentChat={currentChat} socket={socket} />
                    )}
                </div>
            </Container>
        </>
    );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .container {
    height: 85vh;
    width: 100%;
    background-color: #1a1a1a;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;