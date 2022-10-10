import React, {Fragment, useEffect, useState} from "react";
import styled from "styled-components";
import Logo from "../assets/logo-1.svg";
function Contacts({contacts, currentUser, changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    // console.log(contacts);
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser?.currentUserName, currentUser?.avatarImage]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    // console.log(index, contact, currentSelected);
  };
  return (
    <Fragment>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
            <div className="currentUser">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
                <div className="username">
                  <h2>{currentUserName}</h2>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </Fragment>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      font-size: 1.4rem;
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    overflow: auto;
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          font-size: 1.4rem;
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .currentUser {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    min-height: 5rem;
    width: 90%;
    cursor: pointer;
    border-radius: 0.2rem;
    padding: 0.4rem;
    .avatar {
      display: flex;
      gap: 1rem;
      align-items: center;
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
      .username {
        h2 {
          font-size: 1.6rem;
          color: white;
        }
      }
    }
    @media screen and (min-width: 720px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
