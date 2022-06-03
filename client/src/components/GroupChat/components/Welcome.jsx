import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Robot from "../../../assets/img/SLIIT_Logo_Crest.png";
// import { AuthContext } from "../../../context/AuthContext";
export default function Welcome({userData}) {
    const [userName, setUserName] = useState("");

    // const { user, isCoSupervisor, isPanelMember, isSupervisor } = useContext(AuthContext);

    useEffect(() => {
        setUserName(
            userData.username
        );
    }, [])
    
    

    return (
        <Container>
            <img src={Robot} alt="" />
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;