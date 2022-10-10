import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
function ChatRoom({currentUser}) {
  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser.username}</span>
      </h1>
      <h3>Please select a chat to start Messaging !</h3>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  text-align: center;
  img {
    height: 20rem;
  }
  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 2rem;
  }
  span {
    color: #9186f3;
  }
`;

export default ChatRoom;
