import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Logo from "../../../assets/img/SLIIT_Logo_Crest.png";
// import { AuthContext } from "../../../context/AuthContext";

export default function Contacts({ contacts, changeChat, userData }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  // const { user, isCoSupervisor, isPanelMember, isSupervisor } = useContext(AuthContext);

  useEffect(() => {

    setCurrentUserName(userData.username);
    setCurrentUserImage(userData.logo);
  }, [])


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Contacts</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={contact.logo}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h4>{contact.username}</h4>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={userData.logo}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #1a1a1a;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height:3rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      font-family: "Lucida Console", "Courier New", monospace;
    }
    
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #ff6a06;
      hover-color:orange;
    }
  }
  .current-user {
    background-color: #ff8243;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-family: "Tahoma", Times, serif;
    .avatar {
      img {
        height: 3rem;
        width: 3em;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;